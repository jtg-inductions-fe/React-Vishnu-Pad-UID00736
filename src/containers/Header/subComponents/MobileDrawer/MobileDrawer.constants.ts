import { Home, Restaurant, Storefront } from '@mui/icons-material';

import { ROUTES } from '@constant';

export const DRAWER_ITEMS = [
    { label: 'Home', path: ROUTES.HOME, icon: Home },
    { label: 'Menu', path: ROUTES.MENU, icon: Restaurant },
    { label: 'Restaurants', path: ROUTES.RESTAURANTS, icon: Storefront },
];
