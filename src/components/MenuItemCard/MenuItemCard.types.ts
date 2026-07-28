export interface MenuItemCardProps {
    title: string;
    subtitle: string;
    price: string | number;
    rating: number | null;
    tag: string;
    image: string;
    cartQuantity: number;
    actionLabel: string;
    onActionClick?: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}
