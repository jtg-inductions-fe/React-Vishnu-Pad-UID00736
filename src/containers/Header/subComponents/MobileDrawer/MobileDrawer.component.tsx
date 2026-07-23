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
import { styled } from '@mui/material/styles';

import { ROUTES } from '@routes/routes.constants';

import { MobileDrawerProps } from './MobileDrawer.types';

export const CustomDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: '25rem',
        top: '5.5rem',
        height: 'calc(100% - 64px)',
    },
});

export const MobileDrawer = ({
    mobileOpen,
    handleDrawerToggle,
    currentPath,
    handleNavigate,
}: MobileDrawerProps) => (
    <CustomDrawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        ModalProps={{
            keepMounted: true,
        }}
    >
        <List sx={{ pt: 2 }}>
            <ListItem disablePadding>
                <ListItemButton
                    selected={currentPath === ROUTES.HOME}
                    onClick={() => handleNavigate(ROUTES.HOME)}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton
                    selected={currentPath === ROUTES.MENU}
                    onClick={() => handleNavigate(ROUTES.MENU)}
                >
                    <ListItemIcon>
                        <RestaurantMenuIcon />
                    </ListItemIcon>
                    <ListItemText primary="Menu" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton
                    selected={currentPath === ROUTES.RESTAURANTS}
                    onClick={() => handleNavigate(ROUTES.RESTAURANTS)}
                >
                    <ListItemIcon>
                        <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary="Restaurants" />
                </ListItemButton>
            </ListItem>
        </List>
    </CustomDrawer>
);
