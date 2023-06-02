import {Dropdown, Nav, Button} from "react-bootstrap";

import Link from "next/link";
import {UserState} from "@/store/user-slice";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";


interface RightNavigationProps {
    user: UserState;
}

const RightNavigation: React.FC<RightNavigationProps> = ({user}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoggedIn(!!(user?.token));
    }, [user]);

    return (
        <>
            {isLoggedIn && user.user && (
                <Dropdown>
                    <Dropdown.Toggle as={Button} variant="primary" id="dropdown-basic">
                        {user.user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} href={"/auth/logout"}>Odhlásiť sa</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
            {!isLoggedIn && (
                <>
                    <Nav.Link as={Link} href="/auth/login" >Prihlásenie</Nav.Link>
                    <Nav.Link as={Link} href="/auth/signup" >Registrácia</Nav.Link>
                </>
            )}

        </>
    );
}

export default RightNavigation;