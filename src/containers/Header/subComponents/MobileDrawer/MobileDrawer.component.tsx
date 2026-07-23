import { NavLink } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/Restaurant';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Drawer } from '@mui/material';
import { alpha, styled, Theme } from '@mui/material/styles';

import { FONT_WEIGHT } from '@constant';
import { ROUTES } from '@routes/routes.constants';

import { MobileDrawerProps } from './MobileDrawer.types';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: theme.spacing(62.5),
        top: theme.spacing(13.75),
        height: `calc(100% - ${theme.spacing(16)})`,
    },
}));
const DRAWER_ITEMS = [
    { label: 'Home', path: ROUTES.HOME, icon: <HomeIcon /> },
    { label: 'Menu', path: ROUTES.MENU, icon: <RestaurantMenuIcon /> },
    {
        label: 'Restaurants',
        path: ROUTES.RESTAURANTS,
        icon: <StorefrontIcon />,
    },
];

export const MobileDrawer = ({
    mobileOpen,
    handleDrawerToggle,
    handleNavigate,
}: MobileDrawerProps) => {
    const activeLinkStyles = {
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

    return (
        <CustomDrawer
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            variant='temporary'
            ModalProps={{
                keepMounted: true,
            }}
        >
            <List sx={{ pt: 2 }}>
                {DRAWER_ITEMS.map(({ label, path, icon }) => (
                    <ListItem disablePadding key={path}>
                        <ListItemButton
                            component={NavLink}
                            to={path}
                            onClick={handleNavigate(path)}
                            sx={activeLinkStyles}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CustomDrawer>
    );
};
