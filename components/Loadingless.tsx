import React, {ReactNode} from 'react';
import AnimatedLoader from "@/components/AnimatedLoader";

interface LoadinglessProps {
    isLoading: boolean;
    children: ReactNode
}

const Loadingless: React.FC<LoadinglessProps> = ({ isLoading, children }) => {
    return isLoading ? <AnimatedLoader  height={400} width={400}/> : <>{children}</>;
};

export default Loadingless;
