export interface ItemListRowProps {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
<<<<<<< HEAD
    onClick?: () => void;
=======
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
}
