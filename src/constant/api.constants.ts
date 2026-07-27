export const API_URLS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
    },
    USERS: {
        BASE: '/users',
        PROFILE: (id: number | string) => `/users/${id}`,
    },
} as const;
