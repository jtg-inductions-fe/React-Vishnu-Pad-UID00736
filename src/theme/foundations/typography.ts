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
 *
 */
export const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: "'Inter', sans-serif",
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: FONT_WEIGHT.LIGHT,
    fontWeightRegular: FONT_WEIGHT.REGULAR,
    fontWeightMedium: FONT_WEIGHT.MEDIUM,
    fontWeightBold: FONT_WEIGHT.BOLD,
    fontWeightExtraBold: FONT_WEIGHT.EXTRA_BOLD,

    displayLarge: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.DISPLAY_LARGE.MOBILE),
        fontWeight: FONT_WEIGHT.EXTRA_BOLD,
        lineHeight: TYPOGRAPHY.DISPLAY_LARGE.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.DISPLAY_LARGE.LETTER_SPACING,
        color: COLORS.SECONDARY.DARK, // Darkest color for maximum contrast
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.DISPLAY_LARGE.DESKTOP),
        },
    },

    displayMedium: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.DISPLAY_MEDIUM.MOBILE),
        fontWeight: FONT_WEIGHT.EXTRA_BOLD,
        lineHeight: TYPOGRAPHY.DISPLAY_MEDIUM.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.DISPLAY_MEDIUM.LETTER_SPACING,
        color: COLORS.SECONDARY.DARK,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.DISPLAY_MEDIUM.DESKTOP),
        },
    },

    displaySmall: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.DISPLAY_SMALL.MOBILE),
        fontWeight: FONT_WEIGHT.EXTRA_BOLD,
        lineHeight: TYPOGRAPHY.DISPLAY_SMALL.LINE_HEIGHT,
        letterSpacing: TYPOGRAPHY.DISPLAY_SMALL.LETTER_SPACING,
        color: COLORS.SECONDARY.DARK,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.DISPLAY_SMALL.DESKTOP),
        },
    },

    h1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_1.MOBILE),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: TYPOGRAPHY.HEADING_1.LINE_HEIGHT,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_1.DESKTOP),
        },
    },

    h2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_2.MOBILE),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: TYPOGRAPHY.HEADING_2.LINE_HEIGHT,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_2.DESKTOP),
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_3.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.HEADING_3.LINE_HEIGHT,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_3.DESKTOP),
        },
    },

    h4: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_4.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.HEADING_4.LINE_HEIGHT,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_4.DESKTOP),
        },
    },

    h5: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_5.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.HEADING_5.LINE_HEIGHT,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_5.DESKTOP),
        },
    },

    h6: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_6.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.HEADING_6.LINE_HEIGHT,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.HEADING_6.DESKTOP),
        },
    },

    body1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY_LARGE.MOBILE),
        fontWeight: FONT_WEIGHT.LIGHT, // Ya Regular agar reading me dikkat ho
        lineHeight: TYPOGRAPHY.BODY_LARGE.LINE_HEIGHT,
        color: COLORS.NEUTRAL[800],
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY_LARGE.DESKTOP),
        },
    },

    body2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY_MEDIUM.MOBILE),
        fontWeight: FONT_WEIGHT.LIGHT,
        lineHeight: TYPOGRAPHY.BODY_MEDIUM.LINE_HEIGHT,
        color: COLORS.NEUTRAL[500],
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY_MEDIUM.DESKTOP),
        },
    },

    subtitle1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.LABEL_LARGE.MOBILE),
        fontWeight: FONT_WEIGHT.REGULAR,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.LABEL_LARGE.DESKTOP),
        },
    },

    subtitle2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.LABEL_SMALL.MOBILE),
        fontWeight: FONT_WEIGHT.REGULAR,
        color: COLORS.SECONDARY.MAIN,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.LABEL_SMALL.DESKTOP),
        },
    },

    button: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.LABEL_LARGE.MOBILE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.LABEL_LARGE.DESKTOP),
        },
    },

    caption: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.CAPTION.MOBILE),
        fontWeight: FONT_WEIGHT.REGULAR,
        letterSpacing: TYPOGRAPHY.CAPTION.LETTER_SPACING,
        color: COLORS.NEUTRAL[500],
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.CAPTION.DESKTOP),
        },
    },

    overline: {
        fontSize: typographyUtil.pxToRem(10),
        fontWeight: FONT_WEIGHT.BOLD,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: COLORS.PRIMARY.MAIN,
    },
});

export const typography = {
    typographyStyle,
    typographyUtil,
};
