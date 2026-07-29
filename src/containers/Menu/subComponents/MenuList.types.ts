import { MenuItem } from '@type';
import { CartItem } from '@type/cart.types';

export interface MenuListProps {
    menuItems: MenuItem[];
    cartItems: CartItem[];
    isLoading: boolean;
    layout?: 'horizontal' | 'grid';
    onViewAll?: () => void;
    onAddToCart: (item: MenuItem) => () => void;
    onDecrementCart: (id: number) => () => void;
    onRemoveFromCart: (id: number) => () => void;
}
