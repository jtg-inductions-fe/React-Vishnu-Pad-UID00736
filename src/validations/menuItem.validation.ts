import { RegisterOptions } from 'react-hook-form';

export interface MenuItemFormData {
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export const MENU_ITEM_VALIDATION_RULES: {
    [K in keyof MenuItemFormData]: RegisterOptions<MenuItemFormData, K>;
} = {
    name: {
        required: 'Name is required',
        minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
        },
        maxLength: {
            value: 50,
            message: 'Name cannot exceed 50 characters',
        },
    },
    category: {
        required: 'Category is required',
        minLength: {
            value: 3,
            message: 'Category must be at least 3 characters',
        },
        maxLength: {
            value: 30,
            message: 'Category cannot exceed 30 characters',
        },
    },
    price: {
        required: 'Price is required',
        valueAsNumber: true,
        min: {
            value: 0.01,
            message: 'Price must be greater than 0',
        },
    },
    quantity: {
        required: 'Quantity is required',
        valueAsNumber: true,
        min: {
            value: 0,
            message: 'Quantity cannot be negative',
        },
        max: {
            value: 10000,
            message: 'Max quantity is 10000',
        },
    },
};
