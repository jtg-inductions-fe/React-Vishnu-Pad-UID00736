import type { RouteObject } from 'react-router-dom';

import AppLayout from '@layouts/App.layout';
import { LoginPage } from '@pages/Login.page';
import { RegisterPage } from '@pages/Register.page';

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
