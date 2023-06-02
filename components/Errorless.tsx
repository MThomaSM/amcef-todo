import React, {ReactNode} from 'react';

interface ErrorlessProps {
    error: string | null;
    children: ReactNode
}

const Errorless: React.FC<ErrorlessProps> = ({ error, children }) => {
    return error ? <h1>{error}</h1> : <>{children}</>;
};

export default Errorless;
