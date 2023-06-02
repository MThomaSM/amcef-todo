import React, {ReactNode, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {useRouter} from "next/router";

interface AuthenticatedProps {
    children: ReactNode
}
const Authenticated: React.FC<AuthenticatedProps> = ({children}) => {
    const token = useSelector((state: RootState) => state.user.token);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            router.push("/")
        } else {
            setIsAuthenticated(true);
        }
    }, [token]);

    return isAuthenticated ? <>{children}</> : null;
};

export default Authenticated;
