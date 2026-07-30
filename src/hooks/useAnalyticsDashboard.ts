import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { SelectChangeEvent } from '@mui/material';

import { menuApi } from '@api/menu.api';
import { restaurantApi } from '@api/restaurant.api';
import { ROUTES } from '@constant';
import { ChartTab } from '@containers/Analytics/subComponents/AnalyticsChart';
import { getErrorMessage } from '@utils/errorHandler.util';

export const useAnalyticsDashboard = () => {
    const { restaurantId } = useParams<{ restaurantId?: string }>();
    const navigate = useNavigate();
    const currentSelection = restaurantId || 'all';

    const [activeChartTab, setActiveChartTab] = useState<ChartTab>('orders');

    const { useGetMyRestaurantsQuery } = restaurantApi;
    const {
        useGetTopCustomersQuery,
        useGetMenuStatsQuery,
        useGetAllOrdersAnalyticsQuery,
    } = menuApi;

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
        if (newTab !== null) setActiveChartTab(newTab);
    };

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

    return {
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
    };
};
