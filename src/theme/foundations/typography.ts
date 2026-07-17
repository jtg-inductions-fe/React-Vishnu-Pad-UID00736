import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';

export const typographyUtil: TypographyUtils = {
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}rem`,
};

export const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: "'Inter', sans-serif",
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    h1: {
        fontSize: typographyUtil.pxToRem(36),
        fontWeight: 700,
        lineHeight: 1.2,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(48),
        },
    },
    h2: {
        fontSize: typographyUtil.pxToRem(28),
        fontWeight: 700,
        lineHeight: 1.3,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(36),
        },
    },
    h3: {
        fontSize: typographyUtil.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h4: {
        fontSize: typographyUtil.pxToRem(20),
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h5: {
        fontSize: typographyUtil.pxToRem(18),
        fontWeight: 600,
        lineHeight: 1.5,
    },
    h6: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: 600,
        lineHeight: 1.5,
    },

    body1: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: 400,
        lineHeight: 1.5,
    },
    body2: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: 400,
        lineHeight: 1.43,
        color: theme.palette.text.secondary,
    },

    subtitle1: { fontSize: typographyUtil.pxToRem(14), fontWeight: 500 },
    subtitle2: { fontSize: typographyUtil.pxToRem(12), fontWeight: 500 },

    button: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: 600,
        textTransform: 'none',
    },
    caption: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: 500,
        letterSpacing: '0.5px',
        color: theme.palette.text.secondary,
    },
});

export const typography = { typographyStyle, typographyUtil };
