export interface MenuItem {
    id: number;
    restaurant_id: number;
    name: string;
    price: string;
    quantity: number;
    category: string;
    rating: number | null;
}

export interface PaginatedMenuResponse {
    total_items: number;
    page: number;
    size: number;
    items: MenuItem[];
}

export interface MenuItemPayload {
    restaurant_id?: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
}
