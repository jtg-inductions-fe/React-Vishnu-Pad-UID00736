import { baseApi } from './base.api';
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
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
    authApi;
