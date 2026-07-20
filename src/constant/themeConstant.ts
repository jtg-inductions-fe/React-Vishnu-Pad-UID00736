/**
 * All the colors used across the app, including our custom Deep Space theme colors.
 */
export const COLORS = {
    PRIMARY: {
        MAIN: '#FC8019',
        LIGHT: '#FDA354',
        DARK: '#E06B0D',
        CONTRAST: '#FFFFFF',
    },
    SECONDARY: {
        MAIN: '#282C3F',
        LIGHT: '#4A4F6A',
        DARK: '#171A29',
        CONTRAST: '#FFFFFF',
    },
    DEEP_SPACE: {
        BACKGROUND: '#0B0D17',
        PAPER: '#151828',
    },
    FEEDBACK: {
        ERROR: '#EF4F5F',
        SUCCESS: '#60B246',
        WARNING: '#F3C117',
        INFO: '#2196F3',
    },
    NEUTRAL: {
        50: '#F9F9F9',
        100: '#F0F0F5',
        300: '#D4D5D9',
        500: '#93959F',
        800: '#3D4152',
    },
};

/**
 * Standard font thicknesses used in the app.
 */
export const FONT_WEIGHT = {
    LIGHT: 400,
    REGULAR: 500,
    MEDIUM: 600,
    BOLD: 700,
} as const;

/**
 * Standard font sizes and line heights for headings, body text, and buttons.
 */
export const TYPOGRAPHY = {
    H1: { MOBILE: 36, DESKTOP: 48, LINE_HEIGHT: 1.2 },
    H2: { MOBILE: 28, DESKTOP: 36, LINE_HEIGHT: 1.3 },
    H3: { SIZE: 24, LINE_HEIGHT: 1.4 },
    H4: { SIZE: 20, LINE_HEIGHT: 1.4 },
    H5: { SIZE: 18, LINE_HEIGHT: 1.5 },
    H6: { SIZE: 16, LINE_HEIGHT: 1.5 },
    BODY1: { SIZE: 16, LINE_HEIGHT: 1.5 },
    BODY2: { SIZE: 14, LINE_HEIGHT: 1.43 },
    SUBTITLE1: { SIZE: 14 },
    SUBTITLE2: { SIZE: 12 },
    BUTTON: { SIZE: 16 },
    CAPTION: {
        SIZE: 12,
        LETTER_SPACING: '0.5px',
    },
} as const;

/**
 * Base values for calculating responsive rem units and spacing.
 */
export const HTML_FONT_SIZE = 10;
export const SCALING_FACTOR = 4;
