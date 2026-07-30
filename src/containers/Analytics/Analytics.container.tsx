import { useAnalyticsDashboard } from 'hooks';

import { FormControl, Grid2, MenuItem, Select, Stack } from '@mui/material';

import { Restaurant } from '@type';
import { MenuItemStat, TopCustomerStat } from '@type/analytics.types';
import { OrderDetailsResponse } from '@type/order.types';

import { getMetricCardsConfig } from './Analytics.config';
import {
    AnalyticsChart,
    AnalyticsTable,
    AnalyticsTableItem,
    MetricCard,
} from './subComponents';

export const AnalyticsContainer = () => {
    const {
        currentSelection,
        activeChartTab,
        restaurantsData,
        topCustomers,
        menuStats,
        orders,
        isLoadingRestaurants,
        isLoadingCustomers,
        isLoadingMenu,
        isLoadingOrders,
        chartData,
        handleRestaurantChange,
        handleChartTabChange,
    } = useAnalyticsDashboard();

    const isDashboardLoading =
        isLoadingCustomers ||
        isLoadingOrders ||
        isLoadingMenu ||
        isLoadingRestaurants;

    const metricCardsConfig = getMetricCardsConfig({
        totalCustomers: topCustomers?.length || 0,
        totalOrders: orders?.length || 0,
        totalMenuItems: menuStats?.length || 0,
        totalRestaurants: restaurantsData?.length || 0,
        isLoading: isDashboardLoading,
    });

    const renderCustomerRow = (item: TopCustomerStat) => (
        <AnalyticsTableItem
            title={item.customer_name}
            subtitle={item.email}
            value={`${item.total_orders} Orders`}
        />
    );

    const renderMenuRow = (item: MenuItemStat) => (
        <AnalyticsTableItem
            title={item.item_name}
            value={`${item.order_count}x`}
            tooltip={`Ordered ${item.order_count} times`}
        />
    );

    const renderOrderRow = (item: OrderDetailsResponse) => (
        <AnalyticsTableItem
            title={`Order #${item.id}`}
            subtitle={new Date(item.created_at).toLocaleDateString()}
            value={`₹${item.total_amount}`}
        />
    );

    return (
        <Stack gap={4}>
            <Stack direction='row' justifyContent='flex-end'>
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
                {metricCardsConfig.map((metric, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                        <MetricCard
                            title={metric.title}
                            value={metric.value}
                            icon={metric.icon}
                            isLoading={metric.loading}
                        />
                    </Grid2>
                ))}
            </Grid2>

            <AnalyticsChart
                activeTab={activeChartTab}
                onTabChange={handleChartTabChange}
                data={chartData}
                isLoading={isDashboardLoading}
            />

            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsTable
                        title='Top Customers'
                        data={topCustomers?.slice(0, 10)}
                        isLoading={isLoadingCustomers}
                        emptyMessage='No customer data available yet.'
                        renderItem={renderCustomerRow}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsTable
                        title='Top Menu Items'
                        data={menuStats?.slice(0, 10)}
                        isLoading={isLoadingMenu}
                        emptyMessage='No menu sales data available yet.'
                        renderItem={renderMenuRow}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsTable
                        title='Recent Orders'
                        data={orders?.slice(0, 10)}
                        isLoading={isLoadingOrders}
                        emptyMessage='No orders received yet.'
                        renderItem={renderOrderRow}
                    />
                </Grid2>
            </Grid2>
        </Stack>
    );
};
