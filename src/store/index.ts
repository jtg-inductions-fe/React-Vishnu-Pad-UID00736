import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import { baseApi } from '../api/base.api';
/**
 * Configures the application's Redux store.
 */
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
