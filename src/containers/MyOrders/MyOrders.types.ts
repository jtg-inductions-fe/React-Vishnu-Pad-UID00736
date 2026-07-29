import { OrderListResponse } from '@type/order.types';

export interface OrderCardProps {
    order: OrderListResponse;
    onClick: () => void;
}
