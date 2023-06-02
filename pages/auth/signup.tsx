import React, { useState } from "react";
import { useRouter } from "next/router";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {signupSchema} from "@/schemas/signupSchema";
import useHttp from "@/hooks/useHttp";
import {uiActions} from "@/store/ui-slice";
import {userActions, UserState} from "@/store/user-slice";
import {RootState} from "@/store";

const Signup: React.FC = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const {isLoading, error, sendRequest } = useHttp();

    const user = useSelector((state: RootState) => state.user) as UserState;

    if(user.user)
        router.push("/");

    const onSubmitHandler = async (values: {email: string, password: string, confirmPassword: string}, actions: any) => {
        sendRequest({
            method: "POST",
            url: "/api/auth/signup",
            body: values
        }, (data, statusCode) => {
            dispatch(userActions.updateUser({
                token: data.token, expires: data.expiresIn, user: data.data
            }));

            dispatch(
                uiActions.pushNotification(
                    {
                        status: statusCode.toString().startsWith("2") ? 'success' : "danger",
                        message: statusCode.toString().startsWith("2") ? "Boli ste úspešne registrovaný" : "Chyba"
                    }
                 )
            );
            if(statusCode.toString().startsWith("2")){
                actions.resetForm();
                router.push("/")
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
        onSubmit: onSubmitHandler,
    });

    return (
        <Row>
            <Col md={8}>
                <h1>Registrácia</h1>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Zadajte email"
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.email && formik.errors.email)}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Zadajte heslo"
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.password && formik.errors.password)}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Potvrďte heslo</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Zadajte heslo znovu"
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid} className={"mt-2"}>
                        {formik.isSubmitting ? 'Registrovanie...' : 'Registrovať sa'}
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default Signup;
