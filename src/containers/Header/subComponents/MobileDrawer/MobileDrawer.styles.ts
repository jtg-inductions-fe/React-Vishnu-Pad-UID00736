import { Drawer } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { StyledNavLink } from '@containers/Header/Header.styles';

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: theme.spacing(62),
        top: theme.spacing(14),
        height: `calc(100% - ${theme.spacing(16)})`,
    },
}));

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
