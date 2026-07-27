import { API_URLS } from '@constant';
import {
    OrderCreateRequest,
    OrderCreateResponse,
    OrderListResponse,
} from '@type/order.types';

import { baseApi } from './base.api';

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderCreateResponse, OrderCreateRequest>({
            query: (orderData) => ({
                url: API_URLS.ORDERS.CREATE,
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Menu', 'User', 'Order'],
        }),
        getAllOrders: builder.query<OrderListResponse[], void>({
            query: () => ({
                url: API_URLS.ORDERS.BASE,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApi;
