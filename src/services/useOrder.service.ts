import { useCreateOrderMutation, useGetAllOrdersQuery } from '@api/order.api';
import { OrderCreateRequest } from '@type/order.types';

export const useOrderService = () => {
    const [createOrderMutation, createOrderStatus] = useCreateOrderMutation();

    const createOrder = async (orderData: OrderCreateRequest) =>
        await createOrderMutation(orderData).unwrap();

    return {
        createOrder,
        isLoading: createOrderStatus.isLoading,
        isSuccess: createOrderStatus.isSuccess,
        isError: createOrderStatus.isError,
        useGetAllOrdersQuery,
    };
};
