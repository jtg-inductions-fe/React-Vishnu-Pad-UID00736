import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { FONT_WEIGHT, HTML_FONT_SIZE, TYPOGRAPHY } from '@constant';

/**
 * A handy utility for text sizing.
 * It converts standard pixel (px) sizes into 'rem' units.
 * Using 'rem' instead of 'px' is a best practice because it scales better across
 * different devices and respects the user's browser font size settings.
 */
export const typographyUtil: TypographyUtils = {
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}rem`,
};

/**
 * This function defines exactly how all the text in our app should look.
 * It sets the main font (Inter) and specific sizes/weights for everything
 * from giant headings down to tiny captions.
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
        // Automatically make this heading bigger on desktop screens (medium sizes and up)
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H1.DESKTOP),
        },
    },

    h2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H2.MOBILE),
        fontWeight: FONT_WEIGHT.BOLD,
        lineHeight: TYPOGRAPHY.H2.LINE_HEIGHT,
        // Automatically make this heading bigger on desktop screens
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H2.DESKTOP),
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H3.SIZE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H3.LINE_HEIGHT,
    },

    h4: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H4.SIZE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H4.LINE_HEIGHT,
    },

    h5: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H5.SIZE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H5.LINE_HEIGHT,
    },

    h6: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.H6.SIZE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        lineHeight: TYPOGRAPHY.H6.LINE_HEIGHT,
    },

    body1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY1.SIZE),
        fontWeight: FONT_WEIGHT.LIGHT,
        lineHeight: TYPOGRAPHY.BODY1.LINE_HEIGHT,
    },

    body2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BODY2.SIZE),
        fontWeight: FONT_WEIGHT.LIGHT,
        lineHeight: TYPOGRAPHY.BODY2.LINE_HEIGHT,
        color: theme.palette.text.secondary, // Uses a softer color for secondary text
    },

    subtitle1: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.SUBTITLE1.SIZE),
        fontWeight: FONT_WEIGHT.REGULAR,
    },

    subtitle2: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.SUBTITLE2.SIZE),
        fontWeight: FONT_WEIGHT.REGULAR,
    },

    button: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.BUTTON.SIZE),
        fontWeight: FONT_WEIGHT.MEDIUM,
        textTransform: 'none', // Prevents buttons from automatically making text ALL CAPS
    },

    caption: {
        fontSize: typographyUtil.pxToRem(TYPOGRAPHY.CAPTION.SIZE),
        fontWeight: FONT_WEIGHT.REGULAR,
        letterSpacing: TYPOGRAPHY.CAPTION.LETTER_SPACING,
        color: theme.palette.text.secondary,
    },
});

/**
 * We bundle the utility and the styles together here so they can be
 * easily imported into our main theme setup file.
 */
export const typography = {
    typographyStyle,
    typographyUtil,
};
