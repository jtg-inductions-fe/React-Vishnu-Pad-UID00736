import { useCreateOrderMutation } from '@api/order.api';
import { OrderCreateRequest } from '@type/order.types';

export const useOrderService = () => {
    const [createOrderMutation, { isLoading, isSuccess, isError }] =
        useCreateOrderMutation();

    const createOrder = async (orderData: OrderCreateRequest) =>
        await createOrderMutation(orderData).unwrap();
    return {
        createOrder,
        isLoading,
        isSuccess,
        isError,
    };
};
