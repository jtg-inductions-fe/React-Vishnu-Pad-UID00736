import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';
import NotFound from '../pages/NotFound';

/**
 * The main routing setup for the entire application.
 * It combines all the public pages, protected pages (where you need to be logged in),
 * and finally adds a catch-all rule ('*') at the end so any unknown link shows the 404 Not Found page.
 */
const AppRoutes = () =>
    useRoutes([
        ...publicRoutes,
        ...protectedRoutes,
        {
            path: '*',
            element: <NotFound />,
        },
    ]);

export default AppRoutes;
