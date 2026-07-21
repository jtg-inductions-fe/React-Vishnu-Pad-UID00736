import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ValidationErrorDetail {
    type: string;
    loc: (string | number)[];
    msg: string;
    input?: unknown;
    ctx?: Record<string, unknown>;
}

interface ApiErrorResponse {
    success?: boolean;
    error?: string;
    message?: string;
    detail?: string;
    details?: ValidationErrorDetail[];
}

export const getErrorMessage = (err: unknown): string => {
    if (err && typeof err === 'object' && 'status' in err) {
        const fetchError = err as FetchBaseQueryError;

        if (fetchError.data && typeof fetchError.data === 'object') {
            const errorData = fetchError.data as ApiErrorResponse;

            return (
                errorData.message ||
                errorData.detail ||
                'Something went wrong on the server.'
            );
        }
    }
    return 'Network Error. Please try again.';
};
