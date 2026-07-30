import {
    PeopleAlt,
    Receipt,
    RestaurantMenu,
    Storefront,
} from '@mui/icons-material';

import { MetricCardsConfigProps } from './Analytics.types';

export const getMetricCardsConfig = ({
    totalCustomers,
    totalOrders,
    totalMenuItems,
    totalRestaurants,
    isLoading,
}: MetricCardsConfigProps) => [
    {
        title: 'Total Customers',
        value: totalCustomers,
        icon: <PeopleAlt />,
        loading: isLoading,
    },
    {
        title: 'Total Orders',
        value: totalOrders,
        icon: <Receipt />,
        loading: isLoading,
    },
    {
        title: 'Total Menu Items',
        value: totalMenuItems,
        icon: <RestaurantMenu />,
        loading: isLoading,
    },
    {
        title: 'Total Restaurants',
        value: totalRestaurants,
        icon: <Storefront />,
        loading: isLoading,
    },
];
