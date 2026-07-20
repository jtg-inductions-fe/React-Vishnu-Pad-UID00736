import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import { COLORS } from '@constant';

/**
 * This holds the custom design rules for our Material UI components.
 * Setting these up here means every button, card, or text field in the app
 * will automatically match our exact style without having to repeat code.
 */
export const components: Components<Theme> = {
    /**
     * MuiCssBaseline acts like our global CSS.
     * It loads our custom 'Inter' font, sets up easy sizing, and sets the default background color for the whole app.
     */
    MuiCssBaseline: {
        styleOverrides: {
            '@font-face': [
                {
                    fontDisplay: 'swap',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    src: `
                    url(${InterRegularWOFF2}) format('woff2'),
                    url(${InterRegularTTF}) format('truetype')
                `,
                },
            ],
            html: {
                fontSize: '62.5%',
                scrollBehavior: 'smooth',
            },
            body: {
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backgroundColor: COLORS.NEUTRAL[50],
            },
        },
    },

    /**
     * Makes all buttons have rounded corners and a soft colored shadow when you hover over them.
     */
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '0.8rem',
                padding: '1rem 2.4rem',
                boxShadow: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: `0 0.4rem 1.2rem ${alpha(COLORS.PRIMARY.MAIN, 0.2)}`,
                },
            },
        },
    },

    /**
     * Gives cards a clean border, rounded corners, and a slight "lift up" effect when hovered.
     */
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: '1.6rem',
                boxShadow: `0 0.4rem 1.6rem ${alpha(COLORS.SECONDARY.DARK, 0.04)}`,
                border: `1px solid ${COLORS.NEUTRAL[100]}`,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-0.4rem)',
                },
            },
        },
    },

    /**
     * Automatically makes text inputs stretch to full width and gives them smooth, rounded borders.
     */
    MuiTextField: {
        defaultProps: {
            variant: 'outlined',
            fullWidth: true,
        },
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: '0.8rem',
                },
            },
        },
    },

    /**
     * Adds spacing inside lists, puts a subtle line between items, and highlights the row slightly on hover.
     */
    MuiListItem: {
        styleOverrides: {
            root: {
                padding: '1.6rem',
                borderBottom: `1px solid ${COLORS.NEUTRAL[100]}`,
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: COLORS.NEUTRAL[50],
                },
            },
        },
    },
};
