import { API_URLS } from '@constant';
import { MenuItem, MenuItemPayload, PaginatedMenuResponse } from '@type';

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
    }),
    overrideExisting: false,
});
