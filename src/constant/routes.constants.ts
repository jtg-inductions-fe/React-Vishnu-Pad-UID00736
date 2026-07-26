/**
 * Centralizes application route paths.
 */
export const ROUTES = {
    HOME: '/',

    LOGIN: '/login',
    REGISTER: '/register',

    MENU: '/menu',
    RESTAURANTS: '/restaurants',

    MY_CART: '/my-cart',
    MY_ORDERS: '/my-orders',
    ORDER_DETAILS: '/my-orders/:orderId',

    PROFILE: '/profile',

    MY_RESTAURANTS: '/my-restaurants',
    MY_RESTAURANTS_MENU: '/my-restaurants/:restaurantId/menu',
    MY_RESTAURANTS_ANALYTICS_ALL: '/my-restaurants/analytics',
    MY_RESTAURANTS_ANALYTICS: '/my-restaurants/:restaurantId/analytics',
} as const;
