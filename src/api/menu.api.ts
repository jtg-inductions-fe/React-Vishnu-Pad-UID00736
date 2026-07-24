<<<<<<< HEAD
import { API_URLS } from '@constant';
=======
>>>>>>> 6a951d8 ([VP_A3_03] : done with Home Page)
import { PaginatedMenuResponse } from '@type';

import { baseApi } from './base.api';

export const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
<<<<<<< HEAD
        getExploreMenuItems: builder.query<
            PaginatedMenuResponse,
            number | undefined
        >({
            query: (restaurantId) => ({
                url: API_URLS.MENU.SEARCH,
                method: 'GET',
                params: restaurantId
                    ? { restaurant_id: restaurantId }
                    : undefined,
            }),
            providesTags: ['Menu'],
=======
        getExploreMenuItems: builder.query<PaginatedMenuResponse, void>({
            query: () => ({
                url: '/menu/search',
                method: 'GET',
            }),
>>>>>>> 6a951d8 ([VP_A3_03] : done with Home Page)
        }),
    }),
});

export const { useGetExploreMenuItemsQuery } = menuApi;
