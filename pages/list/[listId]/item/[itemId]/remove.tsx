import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "@/hooks/useHttp";
import {uiActions} from "@/store/ui-slice";
import {Item, List} from "@/models/db";
import Link from "next/link";
import Authenticated from "@/components/Authenticated";
import Loadingless from "@/components/Loadingless";
import Errorless from "@/components/Errorless";


const  RemoveListPage: React.FC = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const { sendRequest: sendRequestEdit } = useHttp();
    const {isLoading, error, sendRequest: sendRequestGetData } = useHttp();
    const [item, setItem] = useState<Item>();

    useEffect(() => {
        if(!router.query.listId)
            return;
        sendRequestGetData({
            url: `/api/list/${router.query.listId}/item/${router.query.itemId}`
        }, (data, statusCode) => {
            setItem(data);
        }, true)
    }, [router.query.listId])

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        sendRequestEdit({
            method: "DELETE",
            url: `/api/list/${router.query.listId}/item/${router.query.itemId}/remove`
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
            } else {
                dispatch(
                    uiActions.pushNotification(
                        {
                            status: 'success',
                            message: "Item bol úspešne zmazaný"
                        }
                    )
                );
                router.push("/")
            }
        }, true)
    }


    return (
        <Authenticated>
            <Loadingless isLoading={isLoading}>
                <Errorless error={error}>
                    <div className="text-center">
                        <h3>Prajete si zmazať zariadenie {item?.title}?</h3>
                        <Link href="/"><Button variant="secondary">Zrušiť</Button></Link>{" "}
                        <Button variant="danger" onClick={onDelete}>Odstrániť</Button>
                    </div>
                </Errorless>
            </Loadingless>
        </Authenticated>
    )

}
export default RemoveListPage;