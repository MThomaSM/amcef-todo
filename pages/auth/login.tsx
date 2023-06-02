import React, {useState} from "react";
import {useRouter} from "next/router";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Alerts from "@/components/layout/Alerts";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "@/hooks/useHttp";
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginSchema} from "@/schemas/loginSchema";
import {userActions, UserState} from "@/store/user-slice";
import {uiActions} from "@/store/ui-slice";
import {RootState} from "@/store";

const Login: React.FC = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const {isLoading, error, sendRequest } = useHttp();

    const user = useSelector((state: RootState) => state.user) as UserState;

    if(user.user)
        router.push("/");

    const onSubmitHandler = async (values: { email: string; password: string }, actions: any) => {
        sendRequest({
            method: "POST",
            url: "/api/auth/login",
            body: values
        }, (data, statusCode) => {
            if(!statusCode.toString().startsWith("2")){
                dispatch(
                    uiActions.pushNotification(
                    {
                            status: "danger",
                            message: data.message
                        }
                    )
                )
                return;
            }

            dispatch(userActions.updateUser({
                token: data.token, expires: data.expiresIn, user: data.data
            }));

            dispatch(
                uiActions.pushNotification(
                    {
                        status: 'success',
                        message: "Boli ste úspešne prihláseny"
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
        },
        validationSchema: loginSchema,
        onSubmit: onSubmitHandler,
    });

    return (
        <Row>
            <Col md={8}>
                <h1>Prihlásenie</h1>
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
                    <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid} className={"mt-2"}>
                        {formik.isSubmitting ? 'Prihlasovanie...' : 'Prihlásiť sa'}
                    </Button>
                </Form>
            </Col>
        </Row>
    )

}

export default Login;