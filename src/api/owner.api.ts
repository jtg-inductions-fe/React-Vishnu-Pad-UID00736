import { MenuItem, MenuItemPayload, PaginatedMenuResponse } from '@type';

import { baseApi } from './base.api';

export const menuManagerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurantMenu: builder.query<PaginatedMenuResponse, number>({
            query: (restaurantId) => ({
                url: `/menu/search?restaurant_id=${restaurantId}&page=1&size=100`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Menu', id }],
        }),
        addMenuItem: builder.mutation<MenuItem, MenuItemPayload>({
            query: (body) => ({
                url: '/menu/add',
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
                url: `/menu/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Menu'],
        }),
        deleteMenuItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `/menu/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Menu'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRestaurantMenuQuery,
    useAddMenuItemMutation,
    useUpdateMenuItemMutation,
    useDeleteMenuItemMutation,
} = menuManagerApi;
