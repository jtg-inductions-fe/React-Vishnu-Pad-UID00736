import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

/** Props for the mobile navigation drawer */
interface MobileDrawerProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const CustomDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: '25rem',
        top: '5.5rem',
        height: 'calc(100% - 6.4rem)',
    },
});

export const MobileDrawer = ({
    mobileOpen,
    handleDrawerToggle,
}: MobileDrawerProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        handleDrawerToggle();
        void navigate(path);
    };

    return (
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
                        selected={location.pathname === ROUTES.HOME}
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
                        selected={location.pathname === ROUTES.MENU}
                        onClick={() => handleNavigate(ROUTES.MENU)}
                    >
                        <ListItemIcon>
                            <RestaurantMenuIcon />
                        </ListItemIcon>
                        <ListItemText primary="Menu" />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem disablePadding>
                    <ListItemButton
                        selected={location.pathname === ROUTES.MY_CART}
                        onClick={() => handleNavigate(ROUTES.MY_CART)}
                    >
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Cart" />
                    </ListItemButton>
                </ListItem>
            </List>
        </CustomDrawer>
    );
};
