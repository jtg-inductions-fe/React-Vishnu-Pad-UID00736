import { OrderCreateRequest, OrderCreateResponse } from '@type/order.types';

import { baseApi } from './base.api';

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderCreateResponse, OrderCreateRequest>({
            query: (orderData) => ({
                url: '/orders',
                method: 'POST',
                body: orderData,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateOrderMutation } = orderApi;
