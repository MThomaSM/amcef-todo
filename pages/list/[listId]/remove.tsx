import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "@/hooks/useHttp";
import {userActions, UserState} from "@/store/user-slice";
import {uiActions} from "@/store/ui-slice";
import {RootState} from "@/store";
import {List} from "@/models/db";
import Link from "next/link";
import Authenticated from "@/components/Authenticated";
import Loadingless from "@/components/Loadingless";
import Errorless from "@/components/Errorless";


const  RemoveListPage: React.FC = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const { sendRequest: sendRequestEdit } = useHttp();
    const {isLoading, error, sendRequest: sendRequestGetData } = useHttp();
    const [list, setList] = useState<List>();

    const user = useSelector((state: RootState) => state.user) as UserState;

    useEffect(() => {

        if(!router.query.listId)
            return;

        sendRequestGetData({
            url: "/api/list/"+router.query.listId
        }, (data, statusCode) => {
            setList(data);
        }, true)

    }, [router.query.listId])

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        sendRequestEdit({
            method: "DELETE",
            url: "/api/list/"+router.query.listId+"/remove"
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
                router.push("/")
            }
        }, true)
    }


    return (
        <Authenticated>
            <Loadingless isLoading={isLoading}>
                <Errorless error={error}>
                    <div className="text-center">
                        <h3>Prajete si zmazať zariadenie {list?.title}?</h3>
                        <Link href="/"><Button variant="secondary">Zrušiť</Button></Link>{" "}
                        <Button variant="danger" onClick={onDelete}>Odstrániť</Button>
                    </div>
                </Errorless>
            </Loadingless>
        </Authenticated>
    )

}
export default RemoveListPage;