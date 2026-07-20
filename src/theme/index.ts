import { createTheme } from '@mui/material/styles';

import { SCALING_FACTOR } from '@constant';

import { components } from './components';
import { breakpoints, mixins, palette, typography } from './foundations';

/**
 * This is the master file where everything comes together!
 * We take all our separate design pieces (colors, screen sizes, components, etc.)
 * and combine them to build the final theme that our entire application will use.
 */
let theme = createTheme({
    palette,
    breakpoints,
    mixins,
    components,
    typography: {
        fontFamily: "'Inter', sans-serif",
        ...typography.typographyUtil,
    },
    /**
     * A custom spacing rule to keep our margins and paddings consistent.
     * It uses our SCALING_FACTOR to calculate space and converts it to 'rem'.
     */
    spacing: (factor: number) =>
        theme.typography.pxToRem(factor * SCALING_FACTOR),
});

/**
 * Why are we calling createTheme twice?
 * Our typography styles (like making headings bigger on desktop) need to use the
 * theme's breakpoints. So, we create the base theme first, and then mix in the
 * typography styles in this second step so they have access to those breakpoints.
 */
theme = createTheme(theme, {
    typography: {
        ...typography.typographyStyle(theme),
    },
});

export { theme };
