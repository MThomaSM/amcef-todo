import React, {ReactElement, useEffect, useState} from 'react';
import Head from "next/head";
import {Accordion, Badge, Button, Card, Col, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {showNotification} from "@/store/ui-actions";
import {AnyAction, Dispatch} from "redux";
import {uiActions} from "@/store/ui-slice";
import {RootState} from "@/store";
import {UserState} from "@/store/user-slice";
import useHttp from "@/hooks/useHttp";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {Item, List} from "@/models/db";
import Link from "next/link";
import Authenticated from "@/components/Authenticated";

interface ListItemProps {
    rootList: List
    item: Item
    userId: string
}
const ListItem: React.FC<ListItemProps> = ({rootList, item, userId}): ReactElement => {
    return (
        <Card key={item.id} className="mb-3">
            <Card.Header>{item.title}</Card.Header>
            <Card.Body>
                <Card.Text>{item.description}</Card.Text>
                {item.deadline && (
                    <Badge bg="secondary" className="me-2">
                        Deadline: {item.deadline as string}
                    </Badge>
                )}
                <Badge bg="info">{item.status}</Badge>
                <Badge bg="primary">Vytvoril: {item.createdBy?.email}</Badge>
            </Card.Body>
            <Authenticated>
                {(rootList.userId === userId || rootList.SharedList.some((shared) => shared.userId === userId)) && (
                    <>
                        <Card.Footer className={"d-flex justify-content-center"}>
                            <Link href={"/list/"+rootList.id+"/item/"+item.id+"/edit"}>
                                <Button variant="primary" size={"sm"}>
                                    Edit Item
                                </Button>
                            </Link>
                            <Link href={"/list/"+rootList.id+"/item/"+item.id+"/remove"}>
                                <Button variant="danger" className="ms-2" size={"sm"}>
                                    Remove Item
                                </Button>
                            </Link>
                        </Card.Footer>
                    </>
                )}
            </Authenticated>
        </Card>
    )
}

export default ListItem;