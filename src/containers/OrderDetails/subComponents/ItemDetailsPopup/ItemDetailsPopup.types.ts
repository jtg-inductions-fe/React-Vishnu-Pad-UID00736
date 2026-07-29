import { OrderItemDetailResponse } from '@type/order.types';

export interface ItemDetailsPopupProps {
    open: boolean;
    onClose: () => void;
    item: OrderItemDetailResponse | null;
    restaurantName?: string;
}
