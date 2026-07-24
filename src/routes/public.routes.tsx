import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
<<<<<<< HEAD
import { CartPage } from '@pages/Cart.page';
=======
>>>>>>> 6a951d8 ([VP_A3_03] : done with Home Page)
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
                path: ROUTES.MY_CART,
                element: <CartPage />,
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
