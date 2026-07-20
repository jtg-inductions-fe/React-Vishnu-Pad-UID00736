import { RouteObject } from 'react-router-dom';

import { ROUTES } from './constants';

/**
 * A list of all the public pages in our app.
 * Anyone can visit these pages without needing to log in (like the Home page).
 */
export const publicRoutes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <h1>Home Page</h1>,
    },
];
