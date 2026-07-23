import { useAuth } from 'hooks/useAuth.hook';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Restricts access to authenticated routes.
 */
const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
