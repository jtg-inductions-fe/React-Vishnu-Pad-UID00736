import { MenuItem } from '@type';

export interface OrderCheckoutValidationPayload {
    cartItems: Array<MenuItem & { cartQuantity: number }>;
    totalAmount: number;
    userBalance: number;
    hasMultipleRestaurants: boolean;
}

export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export const validateCartCheckout = (
    payload: OrderCheckoutValidationPayload,
): ValidationResult => {
    const { cartItems, totalAmount, userBalance, hasMultipleRestaurants } =
        payload;

    if (cartItems.length === 0) {
        return {
            isValid: false,
            errorMessage: 'Cart must contain at least one item.',
        };
    }

    if (hasMultipleRestaurants) {
        return {
            isValid: false,
            errorMessage: 'All items must be from the same restaurant.',
        };
    }

    const hasInvalidQuantity = cartItems.some((item) => item.cartQuantity < 1);
    if (hasInvalidQuantity) {
        return {
            isValid: false,
            errorMessage: 'Quantity must be at least 1 for all items.',
        };
    }

    if (userBalance < totalAmount) {
        return {
            isValid: false,
            errorMessage: 'Insufficient balance to place this order.',
        };
    }

    return { isValid: true };
};
