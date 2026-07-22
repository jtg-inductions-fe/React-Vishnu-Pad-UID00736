import { Navigate, Outlet } from 'react-router-dom';

/**
 * Restricts access to authenticated routes.
 */
const ProtectedRoute = () => {
    /** TODO: Replace with the actual authentication state. */
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
