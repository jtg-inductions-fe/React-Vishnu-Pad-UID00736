import { AppBar, Avatar, Drawer, Menu, MenuItem, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

/** Sticky app header container with theme background and shadow. */
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: `0 0.2rem 0.8rem ${theme.palette.divider}`,
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
}));

/** Toolbar with responsive horizontal padding and spaced-out flex alignment. */
export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    ...theme.mixins.flexLayout('space-between', 'center'),
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1.5, 4),
    },
}));

/** Clickable user avatar icon with subtle hover zoom effect. */
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

/** Profile dropdown menu with custom border-radius and elevated shadow. */
export const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1.5),
        overflow: 'visible',
        filter: 'drop-shadow(0 0.2rem 0.8rem rgba(0,0,0,0.1))',
        borderRadius: '1.2rem',
        minWidth: '20rem',
    },
}));

/** Menu item styled with theme error color specifically for logout action. */
export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
}));

/** Side drawer navigation panel with fixed width for mobile views. */
export const StyledDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
        width: '25rem',
        borderRadius: 0,
    },
}));
