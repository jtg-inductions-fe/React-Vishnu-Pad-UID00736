import { RegisterOptions } from 'react-hook-form';

import { LoginFormData, RegisterFormData } from '../types';

export const loginRules: {
    [K in keyof LoginFormData]?: RegisterOptions<LoginFormData, K>;
} = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
    },
};

export const registerRules: {
    [K in keyof RegisterFormData]?: RegisterOptions<RegisterFormData, K>;
} = {
    name: {
        required: 'Name is required',
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long.',
        },
        maxLength: {
            value: 128,
            message: 'Password cannot exceed 128 characters.',
        },
        validate: {
            hasUpperCase: (value: string) =>
                /[A-Z]/.test(value) ||
                'Password must contain at least one uppercase letter.',
            hasLowerCase: (value: string) =>
                /[a-z]/.test(value) ||
                'Password must contain at least one lowercase letter.',
            hasNumber: (value: string) =>
                /\d/.test(value) ||
                'Password must contain at least one numeric digit.',
            hasSpecial: (value: string) =>
                /[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~`]/.test(value) ||
                'Password must contain at least one special character.',
        },
    },
    city: {
        required: 'City is required',
        minLength: { value: 2, message: 'City must be at least 2 characters' },
        maxLength: { value: 100, message: 'City name too long' },
    },
    state: {
        required: 'State is required',
        minLength: { value: 2, message: 'State must be at least 2 characters' },
        maxLength: { value: 100, message: 'State name too long' },
    },
    zipcode: {
        required: 'Zipcode is required',
        minLength: {
            value: 4,
            message: 'Zipcode must be at least 4 characters',
        },
        maxLength: { value: 20, message: 'Zipcode too long' },
    },
    balance: {
        required: 'Balance is required',
        valueAsNumber: true,
        min: { value: 0, message: 'Balance cannot be negative' },
    },
};
