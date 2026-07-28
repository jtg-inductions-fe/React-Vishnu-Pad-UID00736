import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import {
    PeopleAlt as CustomersIcon,
    Receipt as OrdersIcon,
    RestaurantMenu as MenuIcon,
    Storefront as StoreIcon,
} from '@mui/icons-material';
import {
    FormControl,
    Grid2,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';

import {
    useGetAllOrdersAnalyticsQuery,
    useGetMenuStatsQuery,
    useGetTopCustomersQuery,
} from '@api/menuManager.api';
import { useGetMyRestaurantsQuery } from '@api/restaurant.api';
import { AnalyticsChart, ChartTab } from '@components/AnalyticsChart';
import { AnalyticsListColumn } from '@components/AnalyticsListColumn';
import { MetricCard } from '@components/MetricCard';
import { FONT_WEIGHT, ROUTES } from '@constant';
import { Restaurant } from '@type';
import { MenuItemStat, TopCustomerStat } from '@type/analytics.types';
import { OrderDetailsResponse } from '@type/order.types';
import { getErrorMessage } from '@utils';

export const AnalyticsPage = () => {
    const { restaurantId } = useParams<{ restaurantId?: string }>();
    const navigate = useNavigate();

    const currentSelection = restaurantId || 'all';

    const [activeChartTab, setActiveChartTab] = useState<ChartTab>('orders');

    const { data: restaurantsData, isLoading: isLoadingRestaurants } =
        useGetMyRestaurantsQuery();

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

    const handleChartTabChange = (
        _event: React.MouseEvent<HTMLElement>,
        newTab: ChartTab | null,
    ) => {
        if (newTab !== null) {
            setActiveChartTab(newTab);
        }
    };

    const totalCustomers = topCustomers?.length || 0;
    const totalOrders = orders?.length || 0;
    const totalMenuItems = menuStats?.length || 0;
    const totalRestaurants = restaurantsData?.length || 0;

    const chartData = useMemo(() => {
        if (activeChartTab === 'customers' && topCustomers) {
            return topCustomers.slice(0, 10).map((c) => ({
                label: c.customer_name,
                value: c.total_orders,
            }));
        }
        if (activeChartTab === 'menu' && menuStats) {
            return menuStats
                .slice(0, 10)
                .map((m) => ({ label: m.item_name, value: m.order_count }));
        }
        if (activeChartTab === 'orders' && orders) {
            return orders.slice(0, 10).map((o) => ({
                label: `Order #${o.id}`,
                value: parseFloat(o.total_amount as unknown as string),
            }));
        }
        return [];
    }, [activeChartTab, topCustomers, menuStats, orders]);

    const renderCustomerItem = (item: TopCustomerStat) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <Stack gap={0.2}>
                <Typography variant='subtitle2' fontWeight={FONT_WEIGHT.BOLD}>
                    {item.customer_name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                    {item.email}
                </Typography>
            </Stack>
            <Typography variant='subtitle2' color='primary.main'>
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
            <Typography variant='subtitle2' fontWeight={FONT_WEIGHT.BOLD}>
                {item.item_name}
            </Typography>
            <Typography variant='subtitle2' color='primary.main'>
                {item.order_count}x
            </Typography>
        </Stack>
    );

    const renderOrderItem = (item: OrderDetailsResponse) => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <Stack gap={0.2}>
                <Typography variant='subtitle2' fontWeight={FONT_WEIGHT.BOLD}>
                    Order #{item.id}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                    {new Date(item.created_at).toLocaleDateString()}
                </Typography>
            </Stack>
            <Typography variant='subtitle2' color='primary.main'>
                ₹{item.total_amount}
            </Typography>
        </Stack>
    );

    return (
        <Stack gap={4} px={{ xs: 2, md: 4 }} py={4}>
            <Stack
                direction={{ md: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={4}
            >
                <Stack gap={0.5}>
                    <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
                        Analytics Dashboard
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Track your performance, top items, and best customers.
                    </Typography>
                </Stack>

                <FormControl size='small' sx={{ minWidth: 220 }}>
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

            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title='Total Customers'
                        value={totalCustomers}
                        icon={<CustomersIcon />}
                        isLoading={isLoadingCustomers}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title='Total Orders'
                        value={totalOrders}
                        icon={<OrdersIcon />}
                        isLoading={isLoadingOrders}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title='Total Menu Items'
                        value={totalMenuItems}
                        icon={<MenuIcon />}
                        isLoading={isLoadingMenu}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                    <MetricCard
                        title='Total Restaurants'
                        value={totalRestaurants}
                        icon={<StoreIcon />}
                        isLoading={isLoadingRestaurants}
                    />
                </Grid2>
            </Grid2>

            <AnalyticsChart
                activeTab={activeChartTab}
                onTabChange={handleChartTabChange}
                data={chartData}
                isLoading={
                    isLoadingCustomers || isLoadingMenu || isLoadingOrders
                }
            />

            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsListColumn
                        title='Top Customers'
                        data={topCustomers?.slice(0, 10)}
                        isLoading={isLoadingCustomers}
                        emptyMessage='No customer data available yet.'
                        renderItem={renderCustomerItem}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsListColumn
                        title='Top Menu Items'
                        data={menuStats?.slice(0, 10)}
                        isLoading={isLoadingMenu}
                        emptyMessage='No menu sales data available yet.'
                        renderItem={renderMenuItem}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsListColumn
                        title='Recent Orders'
                        data={orders?.slice(0, 10)}
                        isLoading={isLoadingOrders}
                        emptyMessage='No orders received yet.'
                        renderItem={renderOrderItem}
                    />
                </Grid2>
            </Grid2>
        </Stack>
    );
};
