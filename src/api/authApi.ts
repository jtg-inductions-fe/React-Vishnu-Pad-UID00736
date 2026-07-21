import { baseApi } from './baseApi';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<User, RegisterRequest>({
            query: (userData) => ({
                url: '/users',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
