import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
import { HomePage } from '@pages/Home.page';
import { LoginPage } from '@pages/Login.page';
import { MenuPage } from '@pages/Menu.page';
import { RegisterPage } from '@pages/Register.page';
import { RestaurantsPage } from '@pages/Restaurant.page';

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
                path: ROUTES.RESTAURANTS,
                element: <RestaurantsPage />,
            },
            {
                path: ROUTES.MENU,
                element: <MenuPage />,
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
