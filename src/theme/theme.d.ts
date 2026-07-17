import type { CSSProperties } from 'react';

import '@mui/material/styles';

declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        lineClamp: (lines: number) => CSSProperties;
    }
}
