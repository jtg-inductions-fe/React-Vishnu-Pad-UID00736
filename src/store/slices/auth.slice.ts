import toast from 'react-hot-toast';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@type';
import { getErrorMessage } from '@utils/errorHandler.util';

const loadUserFromStorage = (): User | null => {
    try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return null;

        const parsedUser = JSON.parse(storedUser) as User;

        if (parsedUser && typeof parsedUser === 'object') {
            return parsedUser;
        }

        throw new Error('Malformed user data structure');
    } catch (error) {
        toast.error(getErrorMessage(error));
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return null;
    }
};

const initialState: AuthState = {
    user: loadUserFromStorage(),
    token: localStorage.getItem('token'),
    isAuthenticated:
        !!localStorage.getItem('token') && !!localStorage.getItem('user'),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>,
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },

        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
