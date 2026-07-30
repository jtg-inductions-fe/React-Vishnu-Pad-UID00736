import { Drawer } from '@mui/material';
import { alpha, styled, Theme } from '@mui/material/styles';

import { FONT_WEIGHT } from '@constant';
import { StyledNavLink } from '@containers/Header/Header.styles';

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

export const StyledMobileNavLink = styled(StyledNavLink)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1, 2),

    '&.active': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),

        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
        },

        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
}));
