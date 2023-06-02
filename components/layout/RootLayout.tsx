import Navigation from "@/components/layout/Navigation";
import Content from "@/components/layout/Content";
import Footer from "@/components/layout/Footer";
import React, {ReactNode, Suspense} from "react";
interface RootLayoutProps {
    children: ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> = ({ children}) => {
    return (
        <>
            <Navigation/>
            <Content>
                {children}
            </Content>
            <Footer/>
        </>
    )

}

export default RootLayout;