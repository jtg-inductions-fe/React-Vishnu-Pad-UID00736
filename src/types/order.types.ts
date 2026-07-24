export interface OrderItemRequest {
    item_id: number;
    quantity: number;
}

export interface OrderCreateRequest {
    restaurant_id: number;
    items: OrderItemRequest[];
}

export interface OrderCreateResponse {
    status: string;
    order_id: number;
    total_amount: number;
    remaining_balance: number;
}
