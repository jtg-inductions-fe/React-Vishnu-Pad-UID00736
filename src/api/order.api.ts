import { API_URLS } from '@constant';
import { OrderCreateRequest, OrderCreateResponse } from '@type/order.types';

import { baseApi } from './base.api';

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderCreateResponse, OrderCreateRequest>({
            query: (orderData) => ({
                url: API_URLS.ORDERS.CREATE,
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Menu', 'User'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateOrderMutation } = orderApi;
