import type { BreakpointsOptions } from '@mui/material/styles';

/**
 * These are our custom screen size breakpoints for responsive design.
 * They tell the app exactly when to change its layout based on the screen width (in pixels).
 * For example: 'xs' is for mobile screens, 'md' is for tablets, and 'lg' is for desktops.
 */
export const breakpoints: BreakpointsOptions = {
    values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
};
