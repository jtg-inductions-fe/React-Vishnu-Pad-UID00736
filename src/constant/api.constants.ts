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
        GET_BY_RESTAURANT: (restaurantId: number) =>
            `/menu/search?restaurant_id=${restaurantId}&page=1&size=100`,
        ADD: '/menu/add',
        ITEM: (id: number) => `/menu/${id}`,
    },
    RESTAURANTS: {
        FEED: '/restaurants/feed',
        MY_RESTAURANTS: '/restaurants/my',
    },
    ORDERS: {
        BASE: '/orders',
        CREATE: '/orders',
    },
} as const;
