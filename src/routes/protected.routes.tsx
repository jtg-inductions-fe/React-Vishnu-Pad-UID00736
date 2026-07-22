import AppLayout from 'layouts/AppLayout';
import type { RouteObject } from 'react-router-dom';

import { ROUTES } from './constants';
import ProtectedRoute from './ProtectedRoute';

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
                        element: <h1>Profile</h1>,
                    },
                ],
            },
        ],
    },
];
