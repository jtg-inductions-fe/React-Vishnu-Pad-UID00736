import AppLayout from 'layouts/AppLayout';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';
import type { RouteObject } from 'react-router-dom';

import { ROUTES } from './routes.constants';

/**
 * Defines the application's public routes.
 */

export const publicRoutes: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
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
        ],
    },
];
