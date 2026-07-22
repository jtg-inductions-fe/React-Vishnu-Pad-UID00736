import AppLayout from 'layouts/AppLayout';
import type { RouteObject } from 'react-router-dom';

import { ROUTES } from './routes.constants';

/**
 * Defines the application's public routes.
 */

export const publicRoutes: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
            {
                path: ROUTES.HOME,
                element: <h1>Home</h1>,
            },
        ],
    },
];
