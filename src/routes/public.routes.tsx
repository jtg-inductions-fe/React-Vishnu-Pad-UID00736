import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
import { CartPage } from '@pages/Cart/Cart.page';
import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/Login';
import { MenuPage } from '@pages/Menu';
import { RegisterPage } from '@pages/Register';
import { RestaurantsPage } from '@pages/Restaurant';

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
