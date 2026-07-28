export interface MenuItemStat {
    item_id: number;
    item_name: string;
    order_count: number;
}

export interface TopCustomerStat {
    user_id: number;
    customer_name: string;
    email: string;
    total_orders: number;
}

export type AnalyticsTab = 'menu' | 'customers' | 'orders';
