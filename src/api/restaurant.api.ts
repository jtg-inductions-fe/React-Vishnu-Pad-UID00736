import { API_URLS } from '@constant';
import { Restaurant } from '@type';

import { baseApi } from './base.api';

export const restaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurants: builder.query<Restaurant[], void>({
            query: () => ({
                url: API_URLS.RESTAURANTS.FEED,
                method: 'GET',
            }),
        }),
        getMyRestaurants: builder.query<Restaurant[], void>({
            query: () => ({
                url: '/restaurants/me',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});
