import { Navbar, Container, Nav } from 'react-bootstrap';
import RightNavigation from "./RightNavigation";
import LeftNavigation from "./LeftNavigation";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Notification} from "@/store/ui-slice";
import {UserState} from "@/store/user-slice";

const Navigation: React.FC = () => {

    const user = useSelector((state: RootState) => state.user) as UserState;

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} href="/">TODO app</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarColor01" />
                <Navbar.Collapse id="navbarColor01">
                    <Nav className="me-auto">
                        <LeftNavigation user={user}/>
                    </Nav>
                    <Nav>
                        <RightNavigation user={user} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;