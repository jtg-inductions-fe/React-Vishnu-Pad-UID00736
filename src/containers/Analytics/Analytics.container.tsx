import { useAnalyticsDashboard } from 'hooks';

import { FormControl, Grid2, MenuItem, Select, Stack } from '@mui/material';

import { Restaurant } from '@type';

import {
    getMetricCardsConfig,
    renderCustomerRow,
    renderMenuRow,
    renderOrderRow,
} from './Config';
import {
    AnalyticsChart,
    AnalyticsListColumn,
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
                    <AnalyticsListColumn
                        title='Top Customers'
                        data={topCustomers?.slice(0, 10)}
                        isLoading={isLoadingCustomers}
                        emptyMessage='No customer data available yet.'
                        renderItem={renderCustomerRow}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsListColumn
                        title='Top Menu Items'
                        data={menuStats?.slice(0, 10)}
                        isLoading={isLoadingMenu}
                        emptyMessage='No menu sales data available yet.'
                        renderItem={renderMenuRow}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <AnalyticsListColumn
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
