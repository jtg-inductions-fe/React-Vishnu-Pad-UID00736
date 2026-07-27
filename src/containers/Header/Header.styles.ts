import { alpha, Theme } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

export const navLinkBaseStyles = {
    textDecoration: 'none',
    color: 'text.primary',
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover, &.active': {
        color: 'primary.main',
    },
    '&.active': {
        fontWeight: FONT_WEIGHT.MEDIUM,
    },
};

export const cartButtonStyles = {
    color: 'text.primary',
    transition: 'all 0.2s ease',
    '&:hover, &.active': {
        color: 'primary.main',
        backgroundColor: (theme: Theme) =>
            alpha(theme.palette.primary.main, 0.08),
    },
};
