import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

export const palette: PaletteOptions = {
    mode: 'light',
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
        primary: COLORS.NEUTRAL[800],
        secondary: COLORS.NEUTRAL[500],
        disabled: COLORS.NEUTRAL[300],
    },
    background: {
        default: COLORS.NEUTRAL[50],
        paper: '#FFFFFF',
    },
    divider: COLORS.NEUTRAL[100],
};
