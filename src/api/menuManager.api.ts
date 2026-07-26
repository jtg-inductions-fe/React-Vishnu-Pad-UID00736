import { API_URLS } from '@constant';
import { MenuItem, MenuItemPayload, PaginatedMenuResponse } from '@type';
import { MenuItemStat, TopCustomerStat } from '@type/analytics.types';
import { OrderDetailsResponse } from '@type/order.types';

import { baseApi } from './base.api';

export const menuManagerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurantMenu: builder.query<PaginatedMenuResponse, number>({
            query: (restaurantId) => ({
                url: API_URLS.MENU.GET_BY_RESTAURANT(restaurantId),
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Menu', id }],
        }),
        addMenuItem: builder.mutation<MenuItem, MenuItemPayload>({
            query: (body) => ({
                url: API_URLS.MENU.ADD,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_result, _error, { restaurant_id }) => [
                { type: 'Menu', id: restaurant_id },
            ],
        }),
        updateMenuItem: builder.mutation<
            MenuItem,
            { id: number; body: Partial<MenuItemPayload> }
        >({
            query: ({ id, body }) => ({
                url: API_URLS.MENU.ITEM(id),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Menu'],
        }),
        deleteMenuItem: builder.mutation<void, number>({
            query: (id) => ({
                url: API_URLS.MENU.ITEM(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['Menu'],
        }),
        getMenuStats: builder.query<MenuItemStat[], string | undefined>({
            query: (restaurantId) => ({
                url: '/owner/analytics/menu-stats',
                params:
                    restaurantId !== 'all' && restaurantId
                        ? { restaurant_id: restaurantId }
                        : undefined,
            }),
        }),
        getTopCustomers: builder.query<TopCustomerStat[], string | undefined>({
            query: (restaurantId) => ({
                url: '/owner/analytics/top-customers',
                params: {
                    limit: 10,
                    ...(restaurantId !== 'all' && restaurantId
                        ? { restaurant_id: restaurantId }
                        : {}),
                },
            }),
        }),
        getAllOrdersAnalytics: builder.query<
            OrderDetailsResponse[],
            string | undefined
        >({
            query: (restaurantId) => ({
                url: '/owner/analytics/orders',
                params: {
                    limit: 50,
                    offset: 0,
                    ...(restaurantId !== 'all' && restaurantId
                        ? { restaurant_id: restaurantId }
                        : {}),
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRestaurantMenuQuery,
    useAddMenuItemMutation,
    useUpdateMenuItemMutation,
    useDeleteMenuItemMutation,
    useGetMenuStatsQuery,
    useGetTopCustomersQuery,
    useGetAllOrdersAnalyticsQuery,
} = menuManagerApi;
