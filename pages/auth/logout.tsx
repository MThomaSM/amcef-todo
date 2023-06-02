import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/user-slice";
import { useRouter } from "next/router";

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(userActions.logoutUser());
        router.push("/");
    }, [dispatch, router]);

    return <h1>Prebieha odhlásenie...</h1>;
};

export default Logout;
