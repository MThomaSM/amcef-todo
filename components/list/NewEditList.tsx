import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "@/hooks/useHttp";
import {useFormik} from "formik";
import {userActions, UserState} from "@/store/user-slice";
import {uiActions} from "@/store/ui-slice";
import {RootState} from "@/store";
import {listSchema} from "@/schemas/listSchema";
import Loadingless from "@/components/Loadingless";
import Errorless from "@/components/Errorless";


interface NewEditProps {
    type: string
}

const NewEditList: React.FC<NewEditProps> = ({type}) => {

    const router = useRouter();

    const dispatch = useDispatch();

    const { sendRequest: sendRequestEdit } = useHttp();
    const {isLoading, error, sendRequest: sendRequestGetData } = useHttp();

    const user = useSelector((state: RootState) => state.user) as UserState;

    useEffect(() => {
        if(type === "new" || !router.query.listId)
            return

        sendRequestGetData({
            url: "/api/list/"+router.query.listId
        }, (data, statusCode) => {
            formik.setValues({
                title: data.title
            })
        }, true)

    }, [router.query.listId, type])

    const onSubmitHandler = async (values: { title: string;}, actions: any) => {

        sendRequestEdit({
            method: type === "new" ? "POST" : "PUT",
            url: type === "new" ? "/api/list/new" : "/api/list/"+router.query.listId+"/edit",
            body: values
        }, (data, statusCode) => {
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
        }, true)

    }

    const formik = useFormik({
        initialValues: {
            title: ""
        },
        validationSchema: listSchema,
        onSubmit: onSubmitHandler,
    });

    return (
        <Row>
            <Loadingless isLoading={isLoading}>
                <Errorless error={error}>
                    <Col md={8}>
                        <h1>Edit zoznamu</h1>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Nadpis</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Zadajte nadpis"
                                    onBlur={formik.handleBlur}
                                    isInvalid={!!(formik.touched.title && formik.errors.title)}
                                    onChange={formik.handleChange}
                                    value={formik.values.title || ""}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid} className={"mt-2"}>
                                {formik.isSubmitting ? ( type === "new" ? 'Vytváram' : "Upravujem...") : ( type === "new" ? 'Vytvoriť' : 'Upraviť')}
                            </Button>
                        </Form>
                    </Col>
                </Errorless>
            </Loadingless>
        </Row>
    )

}
export default NewEditList;