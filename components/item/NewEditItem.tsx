import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Alerts from "@/components/layout/Alerts";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "@/hooks/useHttp";
import {useFormik} from "formik";
import {uiActions} from "@/store/ui-slice";
import {Item, List} from "@/models/db";
import {itemSchema} from "@/schemas/itemSchema";
import Loadingless from "@/components/Loadingless";
import Errorless from "@/components/Errorless";


interface NewEditProps {
    type: string
}

const NewEditItem: React.FC<NewEditProps> = ({type}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { sendRequest: sendRequestEdit } = useHttp();
    const {isLoading, error, sendRequest: sendRequestGetData } = useHttp();

    useEffect(() => {
        if(type === "new" || !router.query.listId || !router.query.itemId)
            return;

        sendRequestGetData({
            method: "GET",
            url: `/api/list/${router.query.listId}/item/${router.query.itemId}`
        }, (data, statusCode) => {
            formik.setValues({
                title: data.title,
                description: data.description,
                deadline: new Date(data.deadline).toISOString().slice(0, 16),
                status: data.status,
            })
        }, true)

    }, [router.query.listId, router.query.itemId, type])

    const onSubmitHandler = async (values: Item, actions: any) => {
        sendRequestEdit(
            {
                method: type === "new" ? "POST" : "PUT",
                url: type === "new" ? `/api/list/${router.query.listId}/item/new` : `/api/list/${router.query.listId}/item/${router.query.itemId}/edit`,
                body: values,
            },
            (data, statusCode) => {
                const hasError = !!(data.error);

                dispatch(
                    uiActions.pushNotification(
                        {
                            status: hasError ? "danger" : "success",
                            message: data.message
                        }
                    )
                )

                if(!hasError){
                    actions.resetForm();
                    router.push("/")
                }

            },true);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            deadline: new Date(),
            // @ts-ignore
            status: '',
        },
        validationSchema: itemSchema,
        onSubmit: onSubmitHandler,
    });

    return (
        <Row>
            <Loadingless isLoading={isLoading}>
                <Errorless error={error}>
                    <Col md={8}>
                        <h1>Vytvorenie novej položky</h1>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Nadpis</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Zadajte nadpis"
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!(formik.touched.title && formik.errors.title)}
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    placeholder="Zadajte popis"
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!(formik.touched.description && formik.errors.description)}
                                    onChange={formik.handleChange}
                                    value={formik.values.description || ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formDeadline">
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="deadline"
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!(formik.touched.deadline && formik.errors.deadline)}
                                    onChange={formik.handleChange}
                                    value={formik.values.deadline?.toLocaleString()}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.deadline}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!(formik.touched.status && formik.errors.status)}
                                    onChange={formik.handleChange}
                                    value={formik.values.status}
                                >
                                    <option value="">Select status</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.status}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                className="mt-2"
                            >
                                {formik.isSubmitting ? ( type === "new" ? 'Vytváram' : "Upravujem...") : ( type === "new" ? 'Vytvoriť' : 'Upraviť')}
                            </Button>
                        </Form>
                    </Col>
                </Errorless>
            </Loadingless>
        </Row>
    );
}

export default NewEditItem;