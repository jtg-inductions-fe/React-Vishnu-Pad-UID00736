import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Main API setup using RTK Query.
 * It sets the base URL from the env file and automatically adds the
 * auth token from localStorage to every request if it exists.
 */
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL || '',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
