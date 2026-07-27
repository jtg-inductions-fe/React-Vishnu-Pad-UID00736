import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '@type';

export interface CartItem extends MenuItem {
    cartQuantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

const loadState = (): CartState => {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
        return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
    return JSON.parse(serializedState) as CartState;
};

const saveState = (state: CartState) => {
    const serializedState = JSON.stringify({
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
    });
    localStorage.setItem('cartState', serializedState);
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<MenuItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id,
            );

            if (existingItem) {
                existingItem.cartQuantity += 1;
            } else {
                state.items.push({ ...action.payload, cartQuantity: 1 });
            }

            state.totalQuantity += 1;
            state.totalAmount += Number(action.payload.price);

            saveState(state);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload,
            );

            if (existingItem) {
                if (existingItem.cartQuantity === 1) {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload,
                    );
                } else {
                    existingItem.cartQuantity -= 1;
                }
                state.totalQuantity -= 1;
                state.totalAmount -= Number(existingItem.price);

                saveState(state);
            }
        },
        removeItemCompletely: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload,
            );

            if (existingItem) {
                state.totalQuantity -= existingItem.cartQuantity;
                state.totalAmount -=
                    Number(existingItem.price) * existingItem.cartQuantity;
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );

                saveState(state);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;

            saveState(state);
        },
    },
});

export const { addToCart, removeFromCart, removeItemCompletely, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
