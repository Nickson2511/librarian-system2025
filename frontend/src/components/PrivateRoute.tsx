import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks'; 

interface PrivateRouteProps {
    children: ReactNode; 
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = useAppSelector((state) => state.auth.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
