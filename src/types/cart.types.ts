import { MenuItem } from './menu.types';

export interface CartItem extends MenuItem {
    cartQuantity: number;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}
