import { z } from 'zod';

export const updateProfileSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address').optional(),
    city: z
        .string()
        .min(2, 'City must be at least 2 characters')
        .max(100, 'City name too long')
        .optional(),
    state: z
        .string()
        .min(2, 'State must be at least 2 characters')
        .max(100, 'State name too long')
        .optional(),
    zipcode: z
        .string()
        .min(4, 'Zipcode must be at least 4 characters')
        .max(20, 'Zipcode too long')
        .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const walletUpdateSchema = z.object({
    amount: z
        .number()
        .min(1, 'Amount must be at least ₹1')
        .max(100000, 'Amount cannot exceed ₹1,00,000'),
});
