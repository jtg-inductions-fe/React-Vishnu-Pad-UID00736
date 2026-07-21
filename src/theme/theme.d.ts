import { CSSProperties } from 'react';

import '@mui/material/styles';
import '@mui/material/Typography';

/**
 * Extends MUI mixins with the custom `lineClamp` utility.
 */
declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        lineClamp: (lines?: number) => CSSProperties;
        flexLayout: (
            justify?: React.CSSProperties['justifyContent'],
            align?: React.CSSProperties['alignItems'],
            direction?: React.CSSProperties['flexDirection'],
        ) => CSSProperties;
    }
}

/**
 * Updates the `<IconButton />` component's props to accept the custom 'xl' size.
 */
declare module '@mui/material/IconButton' {
    interface IconButtonPropsSizeOverrides {
        xl: true;
    }
}

/**
 * Extends MUI typography with custom font weights.
 */
declare module '@mui/material/styles/createTypography' {
    interface FontStyle {
        fontWeightExtraBold: React.CSSProperties['fontWeight'];
    }
    interface FontStyleOptions {
        fontWeightExtraBold?: React.CSSProperties['fontWeight'];
    }
}

/**
 * Extends MUI theme with custom typography variants (Display).
 */
declare module '@mui/material/styles' {
    interface TypographyVariants {
        displayLarge: CSSProperties;
        displayMedium: CSSProperties;
        displaySmall: CSSProperties;
    }

    // Allows configuration using `createTheme`
    interface TypographyVariantsOptions {
        displayLarge?: CSSProperties;
        displayMedium?: CSSProperties;
        displaySmall?: CSSProperties;
    }
}

/**
 * Updates the `<Typography />` component's props to accept the custom variants.
 */
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        displayLarge: true;
        displayMedium: true;
        displaySmall: true;
    }
}
