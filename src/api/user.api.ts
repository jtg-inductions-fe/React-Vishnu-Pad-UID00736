import toast from 'react-hot-toast';

import { API_URLS } from '@constant/api.constants';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';

import { baseApi } from './base.api';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<User, number>({
            query: (id) => ({
                url: API_URLS.USERS.PROFILE(id),
                method: 'GET',
            }),
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

                    const errorMessage = getErrorMessage(actualError);
                    toast.error(errorMessage);

                    dispatch(logout());
                }
            },
        }),
    }),
});

const { useGetUserProfileQuery } = userApi;

export const useUserService = () => ({
    useGetUserProfileQuery,
});
