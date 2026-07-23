import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected.routes';
import { publicRoutes } from './public.routes';
import NotFoundPage from '../pages/NotFound.page';

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
