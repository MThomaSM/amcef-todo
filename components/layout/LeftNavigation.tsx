import { Nav } from 'react-bootstrap';
import Link from "next/link";
import {UserState} from "@/store/user-slice";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

interface LeftNavigationProps {
    user: UserState;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({user}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!(user?.token));
    }, [user]);

    return (
        <>
            { isLoggedIn && <Nav.Link as={Link} href="/list/new">Vytvoriť nový list</Nav.Link>}
        </>
    )
}
export default LeftNavigation;