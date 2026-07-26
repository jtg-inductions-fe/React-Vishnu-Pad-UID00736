import { z } from 'zod';

export const menuItemSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    category: z
        .string()
        .min(3, 'Category must be at least 3 characters')
        .max(30, 'Category cannot exceed 30 characters'),
    price: z
        .number({ message: 'Price is required and must be a valid number' })
        .positive('Price must be greater than 0'),
    quantity: z
        .number({ message: 'Quantity is required and must be a valid number' })
        .min(0, 'Quantity cannot be negative')
        .max(10000, 'Max quantity is 10000'),
});

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;
