import { RouteObject } from 'react-router-dom';

import { ROUTES } from './constants';

/**
 * Defines the application's public routes.
 */
export const publicRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <h1>Home Page</h1>,
    },
];
