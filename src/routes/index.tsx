import { useRoutes } from 'react-router-dom';

import { NotFoundPage } from '@pages/NotFound';

import { protectedRoutes } from './protected.routes';
import { publicRoutes } from './public.routes';

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
