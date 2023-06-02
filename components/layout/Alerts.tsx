import {useDispatch, useSelector} from "react-redux";
import React from "react";
import CustomAlert from "../CustomAlert";
import {Notification, uiActions} from "@/store/ui-slice";
import {RootState} from "@/store";

const Alerts: React.FC = () => {
    const notifications = useSelector((state: RootState) => state.ui.notifications) as Notification[];
    return (
        <>
            {notifications.map((notification: Notification, index: number) => (
                <CustomAlert variant={notification.status} message={notification.message} key={index} id={notification.id as number}/>
            ))}
        </>
    );
};

export default Alerts;
