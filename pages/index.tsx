import React, {ReactElement} from 'react';
import {Accordion, Badge, Button, Card, Col, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "@/store";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {List} from "@/models/db";
import ListWithItems from "@/components/home/ListWithItems";

interface HomeProps {
    lists: List[]
}

const Home: React.FC<HomeProps> = ({lists}): ReactElement => {
    const userId = useSelector((state: RootState) => state.user.user?.id) as string;
    return (
        <div>
            <h1>Zoznamy</h1>
            <Row className="mb-4">
                {lists && lists.map((list: List, index) => (
                    <ListWithItems key={index} list={list} userId={userId as string}/>
                ))}
            </Row>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const response = await fetch("http://localhost:3000/api/list");
    const data = await response.json();
    return {
        props: {
            lists: data
        }
    };
};
export default Home;
