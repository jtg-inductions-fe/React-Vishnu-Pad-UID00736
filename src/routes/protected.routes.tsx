import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
import { AnalyticsPage } from '@pages/Analytics.page';
import { MenuManagerPage } from '@pages/MenuManager.page';
import { MyOrdersPage } from '@pages/MyOrders.page';
import { MyRestaurantsPage } from '@pages/MyRestaurants.pages';
import { OrderDetailsPage } from '@pages/OrderDetails.page';
import { ProfilePage } from '@pages/Profile.page';

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
