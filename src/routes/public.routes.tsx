import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
import { HomePage } from '@pages/Home.page';
import { LoginPage } from '@pages/Login.page';
import { RegisterPage } from '@pages/Register.page';

/**
 * Defines the application's public routes.
 */

export const publicRoutes: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
            {
                path: ROUTES.HOME,
                element: <HomePage />,
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
