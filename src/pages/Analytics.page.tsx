import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import {
    useGetAllOrdersAnalyticsQuery,
    useGetMenuStatsQuery,
    useGetTopCustomersQuery,
} from '@api/owner.api';
import { useGetMyRestaurantsQuery } from '@api/restaurant.api';
import { AnalyticsDataList } from '@components/AnalyticsDataList';
import { FONT_WEIGHT } from '@constant';
import { ROUTES } from '@routes/routes.constants';
import { Restaurant } from '@type';
import { MenuItemStat, TopCustomerStat } from '@type/analytics.types';
import { OrderDetailsResponse } from '@type/order.types';
import { getErrorMessage } from '@utils';

type AnalyticsTab = 'menu' | 'customers' | 'orders';

export const AnalyticsPage = () => {
    const { restaurantId } = useParams<{ restaurantId?: string }>();
    const navigate = useNavigate();

    const currentSelection = restaurantId || 'all';

    const [activeTab, setActiveTab] = useState<AnalyticsTab>('customers');

    const { data: restaurantsData } = useGetMyRestaurantsQuery();

    const {
        data: topCustomers,
        isLoading: isLoadingCustomers,
        error: customersError,
    } = useGetTopCustomersQuery(currentSelection);

    const {
        data: menuStats,
        isLoading: isLoadingMenu,
        error: menuError,
    } = useGetMenuStatsQuery(currentSelection);

    const {
        data: orders,
        isLoading: isLoadingOrders,
        error: ordersError,
    } = useGetAllOrdersAnalyticsQuery(currentSelection);

    useEffect(() => {
        if (customersError) toast.error(getErrorMessage(customersError));
        if (menuError) toast.error(getErrorMessage(menuError));
        if (ordersError) toast.error(getErrorMessage(ordersError));
    }, [customersError, menuError, ordersError]);

    const handleRestaurantChange = (event: SelectChangeEvent<string>) => {
        const val = event.target.value;
        if (val === 'all') {
            void navigate(ROUTES.MY_RESTAURANTS_ANALYTICS_ALL);
        } else {
            void navigate(
                ROUTES.MY_RESTAURANTS_ANALYTICS.replace(':restaurantId', val),
            );
        }
    };

    const handleTabChange = (
        _event: React.MouseEvent<HTMLElement>,
        newTab: AnalyticsTab | null,
    ) => {
        if (newTab !== null) {
            setActiveTab(newTab);
        }
    };

    const renderCustomerItem = (item: TopCustomerStat) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <Stack gap={0.5}>
                <Typography variant='subtitle1' fontWeight={FONT_WEIGHT.BOLD}>
                    {item.customer_name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {item.email}
                </Typography>
            </Stack>
            <Typography variant='h6' color='primary.main'>
                {item.total_orders} Orders
            </Typography>
        </Stack>
    );

    const renderMenuItem = (item: MenuItemStat) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <Typography variant='subtitle1' fontWeight={FONT_WEIGHT.BOLD}>
                {item.item_name}
            </Typography>
            <Typography variant='h6' color='primary.main'>
                Ordered {item.order_count} times
            </Typography>
        </Stack>
    );

    const renderOrderItem = (item: OrderDetailsResponse) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <Stack gap={0.5}>
                <Typography variant='subtitle1' fontWeight={FONT_WEIGHT.BOLD}>
                    Order #{item.id}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {new Date(item.created_at).toLocaleDateString()}
                </Typography>
            </Stack>
            <Typography variant='h6' color='primary.main'>
                ₹{item.total_amount}
            </Typography>
        </Stack>
    );

    return (
        <Stack gap={5} px={{ xs: 2, md: 4 }} py={4}>
            <Stack
                direction={{ md: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={4}
            >
                <Stack gap={1}>
                    <Typography variant='h3' fontWeight={FONT_WEIGHT.BOLD}>
                        Analytics Dashboard
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Track your performance, top items, and best customers.
                    </Typography>
                </Stack>

                <FormControl size='small' sx={{ minWidth: 200 }}>
                    <Select
                        value={currentSelection}
                        onChange={handleRestaurantChange}
                    >
                        <MenuItem value='all'>All Restaurants</MenuItem>
                        {restaurantsData?.map((res: Restaurant) => (
                            <MenuItem key={res.id} value={String(res.id)}>
                                {res.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <ToggleButtonGroup
                color='primary'
                value={activeTab}
                exclusive
                onChange={handleTabChange}
                aria-label='Analytics Tabs'
                fullWidth
            >
                <ToggleButton value='customers'>Top Customers</ToggleButton>
                <ToggleButton value='menu'>Top Menu Items</ToggleButton>
                <ToggleButton value='orders'>Recent Orders</ToggleButton>
            </ToggleButtonGroup>

            {activeTab === 'customers' && (
                <AnalyticsDataList
                    data={topCustomers}
                    isLoading={isLoadingCustomers}
                    emptyMessage='No customer data available yet.'
                    renderItem={renderCustomerItem}
                />
            )}

            {activeTab === 'menu' && (
                <AnalyticsDataList
                    data={menuStats}
                    isLoading={isLoadingMenu}
                    emptyMessage='No menu sales data available yet.'
                    renderItem={renderMenuItem}
                />
            )}

            {activeTab === 'orders' && (
                <AnalyticsDataList
                    data={orders}
                    isLoading={isLoadingOrders}
                    emptyMessage='No orders received yet.'
                    renderItem={renderOrderItem}
                />
            )}
        </Stack>
    );
};
