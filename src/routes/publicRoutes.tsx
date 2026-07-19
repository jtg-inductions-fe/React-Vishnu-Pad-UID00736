import { RouteObject } from 'react-router-dom';

import { ROUTES } from './constants';

export const publicRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <h1>Home Page</h1>,
    },
];
