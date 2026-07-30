import { useAuth } from 'hooks/useAuth.hook';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constant';

/**
 * Restricts access to public-only routes (like Login & Register)
 * for already authenticated users.
 */
const GuestRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;
