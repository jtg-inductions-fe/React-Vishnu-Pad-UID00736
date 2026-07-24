<<<<<<< HEAD
import { API_URLS } from '@constant';
=======
>>>>>>> 6a951d8 ([VP_A3_03] : done with Home Page)
import { Restaurant } from '@type';

import { baseApi } from './base.api';

export const restaurantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurants: builder.query<Restaurant[], void>({
            query: () => ({
<<<<<<< HEAD
                url: API_URLS.RESTAURANTS.FEED,
=======
                url: '/restaurants/feed',
>>>>>>> 6a951d8 ([VP_A3_03] : done with Home Page)
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetRestaurantsQuery } = restaurantApi;
