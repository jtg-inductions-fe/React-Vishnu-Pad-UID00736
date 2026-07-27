export interface ItemListRowProps {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
    onClick?: () => void;
}
