import { RegisterOptions } from 'react-hook-form';

export interface ProfileFormData {
    name: string;
    email: string;
    city: string;
    state: string;
    zipcode: string;
}

export interface WalletFormData {
    amount: number | string;
}

export const PROFILE_VALIDATION_RULES: Record<
    keyof ProfileFormData,
    RegisterOptions<ProfileFormData>
> = {
    name: {
        required: 'Name is required',
    },
    email: {
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },
    city: {
        minLength: {
            value: 2,
            message: 'City must be at least 2 characters',
        },
        maxLength: {
            value: 100,
            message: 'City name too long',
        },
    },
    state: {
        minLength: {
            value: 2,
            message: 'State must be at least 2 characters',
        },
        maxLength: {
            value: 100,
            message: 'State name too long',
        },
    },
    zipcode: {
        minLength: {
            value: 4,
            message: 'Zipcode must be at least 4 characters',
        },
        maxLength: {
            value: 20,
            message: 'Zipcode too long',
        },
    },
};

export const WALLET_VALIDATION_RULES: RegisterOptions<
    WalletFormData,
    'amount'
> = {
    required: 'Amount is required',
    valueAsNumber: true,
    min: {
        value: 1,
        message: 'Amount must be at least ₹1',
    },
    max: {
        value: 100000,
        message: 'Amount cannot exceed ₹1,00,000',
    },
};
