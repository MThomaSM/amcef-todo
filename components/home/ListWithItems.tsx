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
import {Item} from "@prisma/client";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {List} from "@/models/db";
import Link from "next/link";
import Authenticated from "@/components/Authenticated";
import ListItem from "@/components/home/ListItem";
interface ListWithItemsProps {
    list: List
    userId: string
}
const ListWithItems: React.FC<ListWithItemsProps> = ({list, userId}): ReactElement => {
    return (
        <Col xs={12} md={6} lg={4} className={"mb-3"}>
            <Accordion alwaysOpen={true}>
                <Accordion.Item eventKey={list.id}>
                    <Accordion.Header>{list.title}</Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex justify-content-center">
                            <Authenticated>
                                {(list.userId === userId || list.SharedList.some((shared) => shared.userId === userId)) && (
                                    <>
                                        <Link href={"/list/"+list.id+"/item/new"}>
                                            <Button variant="info" className={"me-2 text-white"} size="sm">
                                                Vytvoriť záznam
                                            </Button>
                                        </Link>

                                        <Link href={"/list/"+list.id+"/remove"}>
                                            <Button variant="danger" className={"me-2"} size="sm">
                                                Zmazať
                                            </Button>
                                        </Link>

                                        <Link href={"/list/"+list.id+"/edit"}>
                                            <Button variant="primary" className={"me-2"} size="sm">
                                                Upraviť
                                            </Button>
                                        </Link>
                                        <Link href={"/list/"+list.id+"/share"}>
                                            <Button variant="secondary" className={"me-2"} size="sm">
                                                Zdieľať
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </Authenticated>
                        </div>

                        <div className="mt-4">
                            {list.items && list.items.map((item, index) => (
                                <ListItem rootList={list} item={item} userId={userId} key={index} />
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    )
}

export default ListWithItems;