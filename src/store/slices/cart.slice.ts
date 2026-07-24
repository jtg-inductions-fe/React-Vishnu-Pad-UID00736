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

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

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
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addToCart, removeFromCart, removeItemCompletely, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
