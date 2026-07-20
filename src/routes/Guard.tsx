import { Navigate, Outlet } from 'react-router-dom';

/**
 * A security guard for our app's private pages.
 * It checks if the user is logged in. If they aren't, it sends them to the login page.
 * If they are logged in, it lets them see the page they asked for (using <Outlet />).
 */
const Guard = () => {
    // Note: Currently hardcoded to true for testing.
    // Later, this will check real login status from Redux or Context.
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default Guard;
