import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '../api/baseApi';

/**
 * The central data store (brain) for our application using Redux.
 * It connects our API (baseApi) so the app can manage fetched data automatically,
 * and adds the necessary middleware so features like caching and background updates work.
 */
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

/**
 * Helper types for TypeScript.
 * RootState tells TS exactly what data is inside our store,
 * and AppDispatch helps TS understand how we send actions to update that data.
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
