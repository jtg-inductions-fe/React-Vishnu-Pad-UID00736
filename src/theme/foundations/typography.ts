import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { COLORS, FONT_WEIGHT, HTML_FONT_SIZE, TYPOGRAPHY } from '@constant';

/**
 * Converts pixel values to rem units.
 */
export const typographyUtil: TypographyUtils = {
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}rem`,
};

/**
 * Defines the application's typography scale.
 */
export const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: "'Inter', sans-serif",
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: FONT_WEIGHT.LIGHT,
    fontWeightRegular: FONT_WEIGHT.REGULAR,
    fontWeightMedium: FONT_WEIGHT.MEDIUM,
    fontWeightBold: FONT_WEIGHT.BOLD,

    h1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H1.MOBILE),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: TYPOGRAPHY.H1.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.H1.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H1.DESKTOP),
        },
    },

    h2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H2.MOBILE),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: TYPOGRAPHY.H2.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.H2.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H2.DESKTOP),
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H3.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H3.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.H3.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H3.DESKTOP),
        },
    },

    h4: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H4.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H4.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.H4.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H4.DESKTOP),
        },
    },

    h5: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H5.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H5.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.H5.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H5.DESKTOP),
        },
    },

    h6: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H6.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H6.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.H6.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H6.DESKTOP),
        },
    },

    body1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY1.MOBILE),
        fontWeight: FONT_WEIGHT.LIGHT,
        lineHeight: TYPOGRAPHY.BODY1.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.BODY1.LETTER_SPACING,
        color: COLORS.NEUTRAL[800],
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY1.DESKTOP),
        },
    },

    body2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY2.MOBILE),
        fontWeight: FONT_WEIGHT.LIGHT,
        lineHeight: TYPOGRAPHY.BODY2.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.BODY2.LETTER_SPACING,
        color: COLORS.NEUTRAL[500],
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY2.DESKTOP),
        },
    },

    subtitle1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.SUBTITLE1.MOBILE),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: TYPOGRAPHY.SUBTITLE1.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.SUBTITLE1.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.SUBTITLE1.DESKTOP),
        },
    },

    subtitle2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.SUBTITLE2.MOBILE),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: TYPOGRAPHY.SUBTITLE2.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.SUBTITLE2.LETTER_SPACING,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.SUBTITLE2.DESKTOP),
        },
    },

    caption: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.CAPTION.MOBILE),
        fontWeight: FONT_WEIGHT.REGULAR,
        lineHeight: TYPOGRAPHY.CAPTION.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.CAPTION.LETTER_SPACING,
        color: COLORS.NEUTRAL[500],
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.CAPTION.DESKTOP),
        },
    },
});

export const typography = {
    typographyStyle,
    typographyUtil,
};
