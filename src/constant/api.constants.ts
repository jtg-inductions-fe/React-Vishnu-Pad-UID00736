export const API_URLS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
    },
    USERS: {
        BASE: '/users',
        PROFILE: (id: number | string) => `/users/${id}`,
    },
    MENU: {
        SEARCH: '/menu/search',
    },
    RESTAURANTS: {
        FEED: '/restaurants/feed',
    },
    ORDERS: {
        CREATE: '/orders',
    },
} as const;
