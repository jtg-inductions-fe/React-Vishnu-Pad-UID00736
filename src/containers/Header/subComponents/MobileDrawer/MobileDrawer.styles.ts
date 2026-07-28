import { Drawer } from '@mui/material';
import { alpha, styled, Theme } from '@mui/material/styles';

import { FONT_WEIGHT } from '@constant';

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: theme.spacing(62),
        top: theme.spacing(14),
        height: `calc(100% - ${theme.spacing(16)})`,
    },
}));

export const activeLinkStyles = {
    '&.active': {
        backgroundColor: (theme: Theme) =>
            alpha(theme.palette.primary.main, 0.08),
        color: 'primary.main',
        fontWeight: FONT_WEIGHT.REGULAR,
        '&:hover': {
            backgroundColor: (theme: Theme) =>
                alpha(theme.palette.primary.main, 0.12),
        },
        '& .MuiListItemIcon-root': {
            color: 'primary.main',
        },
    },
};
