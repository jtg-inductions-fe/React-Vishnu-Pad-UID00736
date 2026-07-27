import { z } from 'zod';

const passwordValidation = z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(128, 'Password cannot exceed 128 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/\d/, 'Password must contain at least one numeric digit.')
    .regex(
        /[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~`]/,
        'Password must contain at least one special character.',
    );

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),

    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),

    password: passwordValidation,

    city: z
        .string()
        .min(2, 'City must be at least 2 characters')
        .max(100, 'City name too long'),

    state: z
        .string()
        .min(2, 'State must be at least 2 characters')
        .max(100, 'State name too long'),

    zipcode: z
        .string()
        .min(4, 'Zipcode must be at least 4 characters')
        .max(20, 'Zipcode too long'),

    balance: z
        .number({
            message: 'Please enter a valid number',
        })
        .min(0, 'Balance cannot be negative'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
