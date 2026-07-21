import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import { COLORS } from '@constant';

/**
 * Defines global Material UI component customizations.
 */
export const components: Components<Theme> = {
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

    MuiIconButton: {
        variants: [
            {
                props: { size: 'xl' },
                style: {
                    padding: '0.5rem',
                    '& .MuiSvgIcon-root': {
                        fontSize: '4.0rem',
                    },
                },
            },
        ],
    },

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
