import { z } from 'zod';

const CartCheckoutBase = z.object({
    restaurantId: z.number(),
    items: z
        .array(
            z.object({
                item_id: z.number(),
                quantity: z.number().min(1, 'Quantity must be at least 1'),
            }),
        )
        .min(1, 'Cart must contain at least one item'),
    totalAmount: z.number(),
    userBalance: z.number(),
    hasMultipleRestaurants: z.boolean(),
});

export const CartCheckoutSchema = CartCheckoutBase.refine(
    (data) => !data.hasMultipleRestaurants,
    {
        message: 'All items must be from the same restaurant.',
        path: ['hasMultipleRestaurants'],
    },
).refine((data) => data.userBalance >= data.totalAmount, {
    message: 'Insufficient balance to place this order.',
    path: ['userBalance'],
});

export type CartCheckoutType = z.infer<typeof CartCheckoutSchema>;
