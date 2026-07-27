import toast from 'react-hot-toast';

import { API_URLS } from '@constant/api.constants';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';

import { baseApi } from './base.api';

export type ProfileUpdateRequest = Partial<
    Omit<User, 'id' | 'role' | 'admin_code'>
>;

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<User, number | string>({
            query: (id) => ({
                url: API_URLS.USERS.PROFILE(id),
                method: 'GET',
            }),
            providesTags: ['User'],

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    const token = localStorage.getItem('token');

                    if (token) {
                        dispatch(setCredentials({ user: data, token }));
                    }
                } catch (err) {
                    const isRtkError =
                        err && typeof err === 'object' && 'error' in err;

                    const actualError = isRtkError
                        ? (err as { error: FetchBaseQueryError }).error
                        : err;

                    toast.error(getErrorMessage(actualError));

                    dispatch(logout());
                }
            },
        }),

        updateUserProfile: builder.mutation<
            User,
            { id: number | string; data: ProfileUpdateRequest }
        >({
            query: ({ id, data }) => ({
                url: API_URLS.USERS.PROFILE(id),
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        deleteUserProfile: builder.mutation<void, number | string>({
            query: (id) => ({
                url: API_URLS.USERS.PROFILE(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),

    overrideExisting: false,
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useDeleteUserProfileMutation,
} = userApi;
