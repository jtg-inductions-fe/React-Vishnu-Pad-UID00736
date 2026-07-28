import type { RouteObject } from 'react-router-dom';

import { ROUTES } from '@constant';
import AppLayout from '@layouts/App.layout';
import { MyOrdersPage } from '@pages/MyOrders.page';
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
                ],
            },
        ],
    },
];
