import type { RouteObject } from 'react-router-dom';

import AppLayout from '@layouts/App.layout';

import ProtectedRoute from './guards/routes.guard';
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
