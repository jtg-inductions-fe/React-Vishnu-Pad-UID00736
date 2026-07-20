import { createTheme } from '@mui/material/styles';

import { SCALING_FACTOR } from '@constant';

import { components } from './components';
import { breakpoints, mixins, palette, typography } from './foundations';
/**
 * Creates the application's Material UI theme.
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
    spacing: (factor: number) =>
        theme.typography.pxToRem(factor * SCALING_FACTOR),
});

/**
 * Recreates the theme so typography can access resolved breakpoints.
 */
theme = createTheme(theme, {
    typography: {
        ...typography.typographyStyle(theme),
    },
});

export { theme };
