import {
    AppBar,
    Avatar,
    Box,
    Button,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0.2rem 0.8rem ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1.5, 4),
    },
}));

export const LeftSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),
}));

export const RightSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const MenuButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
}));

export const MobileMenuIcon = styled(IconButton)(({ theme }) => ({
    display: 'flex',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    '& svg': {
        fontSize: '4rem',
    },
}));

export const LogoImage = styled('img')({
    height: '40px',
    width: 'auto',
    cursor: 'pointer',
    objectFit: 'contain',
});

export const LogoText = styled('span')(({ theme }) => ({
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1.5),
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
        borderRadius: '1.2rem',
        minWidth: '200px',
    },
}));

export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.error.main,
}));

export const StyledDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
        width: 250,
        borderRadius: 0,
    },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
}));

export const DesktopLoginButton = styled(Button)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));
