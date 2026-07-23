import toast from 'react-hot-toast';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout, setCredentials } from '@store/slices';

import { baseApi } from './base.api';
import { User } from '../types';
import { getErrorMessage } from '../utils/errorHandler';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<User, number>({
            query: (id) => ({
                url: `/users/${id}`,
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

export const { useGetUserProfileQuery } = userApi;
