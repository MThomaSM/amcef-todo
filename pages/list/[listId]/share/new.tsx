import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RootState } from "@/store";
import { uiActions } from "@/store/ui-slice";
import useHttp from "@/hooks/useHttp";
import { Item } from "@/models/db";
import { ItemStatus } from "@/models/db";
import { itemSchema } from "@/schemas/itemSchema";
import Authenticated from "@/components/Authenticated";
import Errorless from "@/components/Errorless";
import Loadingless from "@/components/Loadingless";

const NewSharePage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoading, error, sendRequest } = useHttp();

    const onSubmitHandler = async (values: { email: string }, actions: any) => {
        sendRequest(
            {
                method: "POST",
                url: `/api/list/${router.query.listId}/share/new`,
                body: values,
            },
            (data, statusCode) => {
                if (!statusCode.toString().startsWith("2")) {
                    dispatch(
                        uiActions.pushNotification({
                            status: "danger",
                            message: data.message,
                        })
                    );
                    return;
                } else {
                    actions.resetForm();
                    dispatch(
                        uiActions.pushNotification({
                            status: "success",
                            message: "Uspešne ste zdieľaly položku",
                        })
                    );
                    router.push(`/list/`+router.query.listId+"/share");
                }
            },
            true
        );
    };

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
        }),
        onSubmit: onSubmitHandler,
    });

    return (
        <Authenticated>
            <Loadingless isLoading={isLoading}>
                <Errorless error={error}>
                    <Row>
                        <Col md={8}>
                            <h1>Zdieľať zoznam</h1>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        onBlur={formik.handleBlur}
                                        isInvalid={!!(formik.touched.email && formik.errors.email)}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={formik.isSubmitting || !formik.isValid}
                                    className={"mt-2"}
                                >
                                    {formik.isSubmitting ? "Vytváram..." : "Vytvoriť"}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Errorless>
            </Loadingless>
        </Authenticated>
    );
};

export default NewSharePage;
