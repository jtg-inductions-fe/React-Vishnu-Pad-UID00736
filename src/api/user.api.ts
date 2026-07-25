import { API_URLS } from '@constant/api.constants';
import { User } from '@type';

import { baseApi } from './base.api';

export type ProfileUpdateRequest = Partial<
    Omit<User, 'id' | 'role' | 'admin_code'>
>;

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<User, number>({
            query: (id) => ({
                url: API_URLS.USERS.PROFILE(id),
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        updateUserProfile: builder.mutation<
            User,
            { id: number; data: ProfileUpdateRequest }
        >({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        deleteUserProfile: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
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
