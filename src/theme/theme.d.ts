import { CSSProperties } from 'react';

import '@mui/material/styles';
import '@mui/material/Typography';

/**
 * Extends MUI mixins with the custom `lineClamp` utility.
 */
declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        lineClamp: (lines?: number) => CSSProperties;
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
