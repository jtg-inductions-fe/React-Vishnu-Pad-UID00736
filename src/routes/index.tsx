import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';
import NotFound from '../pages/NotFound';

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
