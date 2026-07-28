import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import {
    InterBoldTTF,
    InterBoldWOFF2,
    InterLightTTF,
    InterLightWOFF2,
    InterMediumTTF,
    InterMediumWOFF2,
    InterRegularTTF,
    InterRegularWOFF2,
} from '@assets/fonts';
import { COLORS, FONT_WEIGHT } from '@constant';

/**
 * Defines global Material UI component customizations.
 */
export const components: Components<Theme> = {
    MuiCssBaseline: {
        styleOverrides: (theme) => `
            @font-face {
                font-display: swap;
                font-family: 'Inter';
                font-style: normal;
                font-weight: ${FONT_WEIGHT.LIGHT};
                src: url(${InterLightWOFF2}) format('woff2'), url(${InterLightTTF}) format('truetype');
            }
            @font-face {
                font-display: swap;
                font-family: 'Inter';
                font-style: normal;
                font-weight: ${FONT_WEIGHT.REGULAR};
                src: url(${InterRegularWOFF2}) format('woff2'), url(${InterRegularTTF}) format('truetype');
            }
            @font-face {
                font-display: swap;
                font-family: 'Inter';
                font-style: normal;
                font-weight: ${FONT_WEIGHT.MEDIUM};
                src: url(${InterMediumWOFF2}) format('woff2'), url(${InterMediumTTF}) format('truetype');
            }
            @font-face {
                font-display: swap;
                font-family: 'Inter';
                font-style: normal;
                font-weight: ${FONT_WEIGHT.BOLD};
                src: url(${InterBoldWOFF2}) format('woff2'), url(${InterBoldTTF}) format('truetype');
            }

            html {
                font-size: 62.5%;
                scroll-behavior: smooth;
            }
            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                background-color: ${COLORS.NEUTRAL[50]};
                color: ${COLORS.NEUTRAL[800]};
            }
            *::-webkit-scrollbar {
                width: ${theme.spacing(2)};
                height: ${theme.spacing(2)};
            }
            *::-webkit-scrollbar-track {
                background-color: transparent;
            }
            *::-webkit-scrollbar-thumb {
                background-color: ${COLORS.NEUTRAL[300]};
                border-radius: ${theme.spacing(1)};
            }
            *::-webkit-scrollbar-thumb:hover {
                background-color: ${COLORS.NEUTRAL[500]};
            }
        `,
    },

    MuiPaper: {
        defaultProps: {
            elevation: 0,
        },
        styleOverrides: {
            root: {
                backgroundImage: 'none',
            },
        },
    },

    MuiAppBar: {
        defaultProps: {
            elevation: 0,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: theme.palette.background.paper,
                borderBottom: `1px solid ${COLORS.NEUTRAL[100]}`,
            }),
        },
    },

    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: theme.spacing(4),
                boxShadow: `0 ${theme.spacing(1)} ${theme.spacing(4)} ${alpha(COLORS.SECONDARY.DARK, 0.04)}`,
                border: `1px solid ${COLORS.NEUTRAL[100]}`,
                transition:
                    'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: `0 ${theme.spacing(2)} ${theme.spacing(6)} ${alpha(COLORS.SECONDARY.DARK, 0.08)}`,
                },
            }),
        },
    },

    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                borderRadius: theme.spacing(2),
                padding: theme.spacing(2.5, 6),
                textTransform: 'none',
                fontWeight: FONT_WEIGHT.MEDIUM,
                transition: 'all 0.2s ease-in-out',
                '&.Mui-disabled': {
                    backgroundColor: COLORS.NEUTRAL[100],
                    color: COLORS.NEUTRAL[300],
                },
            }),
            containedPrimary: ({ theme }) => ({
                backgroundColor: COLORS.PRIMARY.MAIN,
                color: COLORS.PRIMARY.CONTRAST,
                '&:hover': {
                    backgroundColor: COLORS.PRIMARY.DARK,
                    boxShadow: `0 ${theme.spacing(1)} ${theme.spacing(3)} ${alpha(COLORS.PRIMARY.MAIN, 0.25)}`,
                },
            }),
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
            textInherit: {
                color: COLORS.NEUTRAL[800],
                '&:hover': {
                    backgroundColor: COLORS.NEUTRAL[100],
                    color: COLORS.NEUTRAL[800],
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
            root: ({ theme }) => ({
                borderRadius: theme.spacing(2),
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
                    boxShadow: `0 0 0 ${theme.spacing(0.75)} ${alpha(COLORS.PRIMARY.MAIN, 0.1)}`,
                },
                '&.Mui-disabled': {
                    backgroundColor: COLORS.NEUTRAL[50],
                },
            }),
        },
    },

    MuiIconButton: {
        styleOverrides: {
            root: ({ ownerState, theme }) => ({
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: alpha(COLORS.SECONDARY.MAIN, 0.04),
                },
                ...(ownerState.size === 'xl' && {
                    padding: theme.spacing(1.25),
                    '& .MuiSvgIcon-root': {
                        fontSize: theme.spacing(10),
                    },
                }),
            }),
        },
    },

    MuiListItemIcon: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: COLORS.NEUTRAL[500],
                minWidth: theme.spacing(10),
                transition: 'color 0.2s ease',
            }),
        },
    },

    MuiListItemButton: {
        styleOverrides: {
            root: ({ theme }) => ({
                padding: theme.spacing(2, 4),
                borderRadius: theme.spacing(2),
                color: COLORS.NEUTRAL[800],
                transition: 'all 0.2s ease',

                '&:hover': {
                    backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.04),
                    color: COLORS.PRIMARY.MAIN,
                    '& .MuiListItemIcon-root': {
                        color: COLORS.PRIMARY.MAIN,
                    },
                },

                '&.Mui-selected': {
                    backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.08),
                    color: COLORS.PRIMARY.MAIN,
                    fontWeight: FONT_WEIGHT.MEDIUM,
                    '&:hover': {
                        backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.12),
                    },
                    '& .MuiListItemIcon-root': {
                        color: COLORS.PRIMARY.MAIN,
                    },
                },
            }),
        },
    },

    MuiListItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                padding: 0,
                marginBottom: theme.spacing(0.5),
            }),
        },
    },

    MuiMenuItem: {
        styleOverrides: {
            root: ({ theme }) => ({
                padding: theme.spacing(2, 4),
                borderRadius: theme.spacing(1),
                transition: 'all 0.2s ease',

                '&:hover': {
                    backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.04),
                    color: COLORS.PRIMARY.MAIN,
                    '& .MuiListItemIcon-root': {
                        color: COLORS.PRIMARY.MAIN,
                    },
                },

                '&.Mui-selected': {
                    backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.08),
                    color: COLORS.PRIMARY.MAIN,
                    fontWeight: FONT_WEIGHT.MEDIUM,
                    '&:hover': {
                        backgroundColor: alpha(COLORS.PRIMARY.MAIN, 0.12),
                    },
                    '& .MuiListItemIcon-root': {
                        color: COLORS.PRIMARY.MAIN,
                    },
                    '& .MuiTypography-root': {
                        color: COLORS.PRIMARY.MAIN,
                        fontWeight: FONT_WEIGHT.MEDIUM,
                    },
                },
            }),
        },
    },
};
