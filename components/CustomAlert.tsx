import { Alert, Container } from "react-bootstrap";
import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {uiActions} from "@/store/ui-slice";

interface CustomAlertProps {
    id: number
    variant: string;
    message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ id, variant, message }) => {
    const [show, setShow] = useState<boolean>(true);
    const dispatch = useDispatch();

    setTimeout(() => {
        dispatch(uiActions.removeNotification(id));
    }, 3000)

    if (show) {
        return (
            <Alert
                variant={variant}
                className="rounded-0 border-0"
                style={{ height: "60px", marginBottom: "2px" }}
                onClose={() => setShow(false)}
                dismissible
            >
                <Container>
                    <p>{message}</p>
                </Container>
            </Alert>
        );
    } else return null;
};

export default CustomAlert;
