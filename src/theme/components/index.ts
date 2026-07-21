import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import { COLORS, FONT_WEIGHT } from '@constant';

/**
 * Defines global Material UI component customizations.
 *
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
                color: COLORS.NEUTRAL[800],
            },
            '*::-webkit-scrollbar': {
                width: '0.8rem',
                height: '0.8rem',
            },
            '*::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: COLORS.NEUTRAL[300],
                borderRadius: '0.4rem',
            },
            '*::-webkit-scrollbar-thumb:hover': {
                backgroundColor: COLORS.NEUTRAL[500],
            },
        },
    },

    MuiPaper: {
        defaultProps: {
            elevation: 0,
        },
        styleOverrides: {
            root: {
                borderRadius: '1.2rem',
                backgroundImage: 'none',
                border: `1px solid ${COLORS.NEUTRAL[100]}`,
            },
        },
    },

    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: '1.6rem',
                boxShadow: `0 0.4rem 1.6rem ${alpha(COLORS.SECONDARY.DARK, 0.04)}`,
                border: `1px solid ${COLORS.NEUTRAL[100]}`,
                transition:
                    'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-0.4rem)',
                    boxShadow: `0 0.8rem 2.4rem ${alpha(COLORS.SECONDARY.DARK, 0.08)}`,
                },
            },
        },
    },

    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: {
                borderRadius: '0.8rem',
                padding: '1rem 2.4rem',
                textTransform: 'none',
                fontWeight: FONT_WEIGHT.MEDIUM,
                transition: 'all 0.2s ease-in-out',
                '&.Mui-disabled': {
                    backgroundColor: COLORS.NEUTRAL[100],
                    color: COLORS.NEUTRAL[300],
                },
            },
            containedPrimary: {
                backgroundColor: COLORS.PRIMARY.MAIN,
                color: COLORS.PRIMARY.CONTRAST,
                '&:hover': {
                    backgroundColor: COLORS.PRIMARY.DARK,
                    boxShadow: `0 0.4rem 1.2rem ${alpha(COLORS.PRIMARY.MAIN, 0.25)}`,
                },
            },
            outlinedPrimary: {
                color: COLORS.PRIMARY.MAIN,
                borderColor: COLORS.PRIMARY.MAIN,
                '&:hover': {
                    backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.04),
                    borderColor: COLORS.PRIMARY.DARK,
                },
            },
            textPrimary: {
                color: COLORS.PRIMARY.MAIN,
                '&:hover': {
                    backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.08),
                },
            },
        },
    },

    MuiTextField: {
        defaultProps: {
            variant: 'outlined',
            fullWidth: true,
            size: 'medium',
        },
    },

    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: '0.8rem',
                backgroundColor: COLORS.PRIMARY.CONTRAST,
                transition: 'all 0.2s ease',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLORS.NEUTRAL[300],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLORS.NEUTRAL[500],
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLORS.PRIMARY.MAIN,
                    borderWidth: '1px',
                    boxShadow: `0 0 0 0.3rem ${alpha(COLORS.PRIMARY.MAIN, 0.1)}`,
                },
                '&.Mui-disabled': {
                    backgroundColor: COLORS.NEUTRAL[50],
                },
            },
        },
    },

    MuiIconButton: {
        styleOverrides: {
            root: {
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: alpha(COLORS.SECONDARY.MAIN, 0.04),
                },
            },
        },
        variants: [
            {
                props: { size: 'xl' },
                style: {
                    padding: '1.2rem',
                    '& .MuiSvgIcon-root': {
                        fontSize: '3.2rem',
                    },
                },
            },
        ],
    },

    MuiListItem: {
        styleOverrides: {
            root: {
                padding: '1.2rem 1.6rem',
                borderRadius: '0.8rem',
                marginBottom: '0.4rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: COLORS.NEUTRAL[100],
                },
            },
        },
    },
};
