import { Restaurant } from '@type';

import { baseApi } from './base.api';

export const restaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurants: builder.query<Restaurant[], void>({
            query: () => ({
                url: '/restaurants/feed',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetRestaurantsQuery } = restaurantApi;
