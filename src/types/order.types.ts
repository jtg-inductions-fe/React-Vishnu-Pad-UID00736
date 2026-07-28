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

export interface OrderListResponse {
    id: number;
    restaurant_id: number;
    restaurant_name: string;
    total_amount: string;
    created_at: string;
    total_items: number;
    items_summary: string;
}

export interface OrderItemDetailResponse {
    id: number;
    menu_item_id: number;
    menu_item_name: string;
    menu_item_rating?: number;
    quantity: number;
    price_at_order: string;
}

export interface OrderDetailsResponse {
    id: number;
    restaurant_id: number;
    restaurant_name: string;
    total_amount: string;
    created_at: string;
    items: OrderItemDetailResponse[];
}
