import { API_URLS } from '@constant/api.constants';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@type';

import { baseApi } from './base.api';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: API_URLS.AUTH.LOGIN,
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<User, RegisterRequest>({
            query: (userData) => ({
                url: API_URLS.USERS.BASE,
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_URLS.AUTH.LOGOUT,
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
    authApi;
