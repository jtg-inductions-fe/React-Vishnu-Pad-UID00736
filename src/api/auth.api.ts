import { API_URLS } from '@constant/api.constants';

import { baseApi } from './base.api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';

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

const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

export const useAuthService = () => {
    const [login, loginMeta] = useLoginMutation();
    const [register, registerMeta] = useRegisterMutation();
    const [logout, logoutMeta] = useLogoutMutation();

    return {
        login,
        register,
        logout,
        isLoginLoading: loginMeta.isLoading,
        isRegisterLoading: registerMeta.isLoading,
        isLogoutLoading: logoutMeta.isLoading,
    };
};
