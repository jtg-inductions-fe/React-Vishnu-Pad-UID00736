import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';
import { RouteObject } from 'react-router-dom';

import { ROUTES } from './constants';

/**
 * Defines the application's public routes.
 */
export const publicRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <h1>Home Page</h1>,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
    },
];
