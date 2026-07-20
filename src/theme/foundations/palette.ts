import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

/**
 * This sets up the color scheme (palette) for our entire application.
 * It connects the custom colors we defined in our constants file to Material UI's
 * built-in categories. This way, when we use a "primary" button or an "error" alert,
 * Material UI automatically knows exactly which shades to use.
 */
export const palette: PaletteOptions = {
    mode: 'light', // Sets the default theme to light mode
    primary: {
        main: COLORS.PRIMARY.MAIN,
        light: COLORS.PRIMARY.LIGHT,
        dark: COLORS.PRIMARY.DARK,
        contrastText: COLORS.PRIMARY.CONTRAST,
    },
    secondary: {
        main: COLORS.SECONDARY.MAIN,
        light: COLORS.SECONDARY.LIGHT,
        dark: COLORS.SECONDARY.DARK,
        contrastText: COLORS.SECONDARY.CONTRAST,
    },
    error: { main: COLORS.FEEDBACK.ERROR },
    success: { main: COLORS.FEEDBACK.SUCCESS },
    warning: { main: COLORS.FEEDBACK.WARNING },
    info: { main: COLORS.FEEDBACK.INFO },
    text: {
        primary: COLORS.NEUTRAL[800], // Main text color (usually darkest)
        secondary: COLORS.NEUTRAL[500], // Softer text for things like subtitles
        disabled: COLORS.NEUTRAL[300],
    },
    background: {
        default: COLORS.NEUTRAL[50], // The main background color for the app pages
        paper: '#FFFFFF', // The background color for cards, modals, and menus
    },
    divider: COLORS.NEUTRAL[100], // Color for lines that separate content
};
