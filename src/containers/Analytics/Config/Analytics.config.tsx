import {
    PeopleAlt,
    Receipt,
    RestaurantMenu,
    Storefront,
} from '@mui/icons-material';

import { MenuItemStat, TopCustomerStat } from '@type/analytics.types';
import { OrderDetailsResponse } from '@type/order.types';

import { GetMetricCardsConfigProps } from './Analytics.config.types';
import { AnalyticsRowItem } from '../subComponents';

export const getMetricCardsConfig = ({
    totalCustomers,
    totalOrders,
    totalMenuItems,
    totalRestaurants,
    isLoading,
}: GetMetricCardsConfigProps) => [
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

export const renderCustomerRow = (item: TopCustomerStat) => (
    <AnalyticsRowItem
        title={item.customer_name}
        subtitle={item.email}
        value={`${item.total_orders} Orders`}
    />
);

export const renderMenuRow = (item: MenuItemStat) => (
    <AnalyticsRowItem
        title={item.item_name}
        value={`${item.order_count}x`}
        tooltip={`Ordered ${item.order_count} times`}
    />
);

export const renderOrderRow = (item: OrderDetailsResponse) => (
    <AnalyticsRowItem
        title={`Order #${item.id}`}
        subtitle={new Date(item.created_at).toLocaleDateString()}
        value={`₹${item.total_amount}`}
    />
);
