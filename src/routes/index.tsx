import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Configures the application's route definitions.
 */
const AppRoutes = () =>
    useRoutes([
        ...publicRoutes,
        ...protectedRoutes,
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);

export default AppRoutes;
