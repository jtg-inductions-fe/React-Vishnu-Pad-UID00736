import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // for now its hardcoded true..... later i will update with actuall state
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
