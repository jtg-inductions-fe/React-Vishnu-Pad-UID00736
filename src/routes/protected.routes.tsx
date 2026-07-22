import AppLayout from 'layouts/AppLayout';
import type { RouteObject } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './routes.constants';

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
