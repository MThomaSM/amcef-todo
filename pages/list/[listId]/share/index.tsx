import { GetServerSideProps, GetServerSidePropsContext } from "next";
import {Button, Col, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import useHttp from "@/hooks/useHttp";
import {useRouter} from "next/router";
import {User} from "@/models/db";
import Link from "next/link";
import Authenticated from "@/components/Authenticated";
import Errorless from "@/components/Errorless";
import Loadingless from "@/components/Loadingless";

const ShareListPage: React.FC = () => {

    const [sharedList, setSharedList] = useState<any[]>([]);
    const router = useRouter();

    const {isLoading, error, sendRequest: sendRequestGetData } = useHttp();

    useEffect(() => {
        if(!router.query.listId)
            return;
        sendRequestGetData({
            url: "/api/list/"+router.query.listId+"/share"
        }, (data, statusCode) => {
            setSharedList(data);
        }, true)
    }, [router.query.listId])

    return (
        <Authenticated>
            <Loadingless isLoading={isLoading}>
                <Errorless error={error}>
                    <Row>
                        <Col md={10}>
                            <h1>Zoznam uživateľov ktorým zdieľate zoznam</h1>
                        </Col>
                        <Col md={2}>
                            <Link href={"/list/"+router.query.listId+"/share/new"}>
                                <Button variant={"primary"}>Zdieľať dalej</Button>
                            </Link>
                        </Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sharedList && sharedList.map((user) => (
                                <tr key={Math.random()}>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link href={"/list/"+router.query.listId+"/share/"+user.shareId+"/remove"}>
                                            <Button variant="danger" className="ms-2" size={"sm"}>
                                                Zmazať
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {sharedList?.length === 0 && <tr><td colSpan={2}>Zoznam nikomu nezdieľate</td></tr>}
                            </tbody>
                        </Table>
                    </Row>
                </Errorless>
            </Loadingless>
        </Authenticated>
    );
};

export default ShareListPage;