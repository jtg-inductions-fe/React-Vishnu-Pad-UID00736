import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { ApiErrorResponse } from '../types/errorHandler.types';

export const getErrorMessage = (err: unknown): string => {
    if (err && typeof err === 'object' && 'status' in err) {
        const fetchError = err as FetchBaseQueryError;

        if (fetchError.data && typeof fetchError.data === 'object') {
            const errorData = fetchError.data as ApiErrorResponse;

            return (
                errorData.error ||
                errorData.message ||
                errorData.detail ||
                'Something went wrong on the server.'
            );
        }
    }
    return 'Network Error. Please try again.';
};
