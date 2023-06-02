import {Container} from 'react-bootstrap';
import React, {ReactNode} from "react";
import Alerts from "@/components/layout/Alerts";

interface ContentProps {
    children: ReactNode;
}
const Content: React.FC<ContentProps> = ({children}) => {
    return (
        <main>
            <Alerts/>
            <section className="py-3">
                <Container fluid={false}>
                    {children}
                </Container>
            </section>
        </main>
    );
}

export default Content;