import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
import { AnalyticsPage } from '@pages/Analytics';
import { MenuManagerPage } from '@pages/MenuManager';
import { MyOrdersPage } from '@pages/MyOrders/MyOrders.page';
import { MyRestaurantsPage } from '@pages/MyRestaurants';
import { OrderDetailsPage } from '@pages/OrderDetails';
import { ProfilePage } from '@pages/Profile';

import ProtectedRoute from './guards/routes.guard';

/**
 * Defines the application's protected routes.
 */
export const protectedRoutes: RouteObject[] = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: ROUTES.PROFILE,
                        element: <ProfilePage />,
                    },
                    {
                        path: ROUTES.MY_ORDERS,
                        element: <MyOrdersPage />,
                    },
                    {
                        path: ROUTES.ORDER_DETAILS,
                        element: <OrderDetailsPage />,
                    },
                    {
                        path: ROUTES.MY_RESTAURANTS,
                        element: <MyRestaurantsPage />,
                    },

                    {
                        path: ROUTES.MY_RESTAURANTS_MENU,
                        element: <MenuManagerPage />,
                    },
                    {
                        path: ROUTES.MY_RESTAURANTS_ANALYTICS_ALL,
                        element: <AnalyticsPage />,
                    },
                    {
                        path: ROUTES.MY_RESTAURANTS_ANALYTICS,
                        element: <AnalyticsPage />,
                    },
                ],
            },
        ],
    },
];
