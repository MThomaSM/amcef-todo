import React, {useEffect, useState} from "react";
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
import {List, SharedList} from "@/models/db";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {listSchema} from "@/schemas/listSchema";
import {getAuthToken} from "@/utils/auth";
import qsa from "dom-helpers/querySelectorAll";
import Link from "next/link";
import Authenticated from "@/components/Authenticated";
import Loadingless from "@/components/Loadingless";
import Errorless from "@/components/Errorless";


const  RemoveShareListPage: React.FC = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const { sendRequest: sendRequestEdit } = useHttp();
    const {isLoading, error, sendRequest: sendRequestGetData } = useHttp();
    const [shareList, setShareList] = useState<SharedList>();

    const user = useSelector((state: RootState) => state.user) as UserState;

    useEffect(() => {
        if(!router.query.listId || !router.query.listId)
            return;
        sendRequestGetData({
            url: "/api/list/"+router.query.listId+"/share/"+router.query.shareId
        }, (data, statusCode) => {
            setShareList(data);
        }, true)
    }, [router.query.listId, router.query.shareId])

    const onDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        sendRequestEdit({
            method: "DELETE",
            url: "/api/list/"+router.query.listId+"/share/"+router.query.shareId+"/remove"
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
                            message: "Zoznam bol úspešne zmazaný"
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
                        <h3>Prajete si zmazať zdieľanie list {shareList?.list.title} užívateľovy {shareList?.user.email}?</h3>
                        <Link href="/"><Button variant="secondary">Zrušiť</Button></Link>{" "}
                        <Button variant="danger" onClick={onDelete}>Odstrániť</Button>
                    </div>
                </Errorless>
            </Loadingless>
        </Authenticated>
    )

}
export default RemoveShareListPage;