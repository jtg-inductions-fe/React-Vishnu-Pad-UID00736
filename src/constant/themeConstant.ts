/**
 * Defines the application's font weights.
 */
export const FONT_WEIGHT = {
    LIGHT: 400,
    REGULAR: 500,
    MEDIUM: 600,
    BOLD: 700,
    EXTRA_BOLD: 800,
} as const;
/**
 * Defines the application's color palette.
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
 * Defines the application's typography scale.
 */
export const TYPOGRAPHY = {
    DISPLAY_LARGE: {
        MOBILE: 60,
        DESKTOP: 100,
        LINE_HEIGHT: 1,
        LETTER_SPACING: '-1.5px',
    },

    DISPLAY_MEDIUM: {
        MOBILE: 48,
        DESKTOP: 72,
        LINE_HEIGHT: 1.1,
        LETTER_SPACING: '-1px',
    },

    DISPLAY_SMALL: {
        MOBILE: 40,
        DESKTOP: 56,
        LINE_HEIGHT: 1.2,
        LETTER_SPACING: '-0.5px',
    },

    HEADING_1: {
        MOBILE: 36,
        DESKTOP: 48,
        LINE_HEIGHT: 1.2,
        LETTER_SPACING: '-0.5px',
    },

    HEADING_2: {
        MOBILE: 28,
        DESKTOP: 36,
        LINE_HEIGHT: 1.3,
        LETTER_SPACING: '-0.25px',
    },

    HEADING_3: {
        MOBILE: 24,
        DESKTOP: 24,
        LINE_HEIGHT: 1.4,
        LETTER_SPACING: '0px',
    },

    HEADING_4: {
        MOBILE: 20,
        DESKTOP: 20,
        LINE_HEIGHT: 1.4,
        LETTER_SPACING: '0px',
    },

    HEADING_5: {
        MOBILE: 18,
        DESKTOP: 18,
        LINE_HEIGHT: 1.5,
        LETTER_SPACING: '0px',
    },

    HEADING_6: {
        MOBILE: 16,
        DESKTOP: 16,
        LINE_HEIGHT: 1.5,
        LETTER_SPACING: '0px',
    },

    BODY_LARGE: {
        MOBILE: 16,
        DESKTOP: 16,
        LINE_HEIGHT: 1.5,
        LETTER_SPACING: '0.15px',
    },

    BODY_MEDIUM: {
        MOBILE: 14,
        DESKTOP: 14,
        LINE_HEIGHT: 1.43,
        LETTER_SPACING: '0.1px',
    },

    LABEL_LARGE: {
        MOBILE: 16,
        DESKTOP: 16,
        LINE_HEIGHT: 1.5,
        LETTER_SPACING: '0.15px',
    },

    LABEL_SMALL: {
        MOBILE: 14,
        DESKTOP: 14,
        LINE_HEIGHT: 1.43,
        LETTER_SPACING: '0.1px',
    },

    CAPTION: {
        MOBILE: 12,
        DESKTOP: 12,
        LINE_HEIGHT: 1.66,
        LETTER_SPACING: '0.4px',
    },
} as const;

/**
 * Base font size used for rem conversion.
 */
export const HTML_FONT_SIZE = 10;

/**
 * Base spacing unit used throughout the application.
 */
export const SCALING_FACTOR = 4;
