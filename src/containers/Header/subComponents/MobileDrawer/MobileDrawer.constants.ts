import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/Restaurant';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { ROUTES } from '@constant';

export const DRAWER_ITEMS = [
    { label: 'Home', path: ROUTES.HOME, icon: HomeIcon },
    { label: 'Menu', path: ROUTES.MENU, icon: RestaurantMenuIcon },
    { label: 'Restaurants', path: ROUTES.RESTAURANTS, icon: StorefrontIcon },
];
