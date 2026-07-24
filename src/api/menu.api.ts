import { API_URLS } from '@constant';
import { PaginatedMenuResponse } from '@type';

import { baseApi } from './base.api';

export const menuApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getExploreMenuItems: builder.query<
            PaginatedMenuResponse,
            number | undefined
        >({
            query: () => ({
                url: API_URLS.MENU.SEARCH,
                method: 'GET',
                params: restaurantId
                    ? { restaurant_id: restaurantId }
                    : undefined,
            }),
        }),
    }),
});

export const { useGetExploreMenuItemsQuery } = menuApi;
