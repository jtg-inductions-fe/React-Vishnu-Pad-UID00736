import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {
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
        height: 'calc(100% - 64px)',
    },
});

export const MobileDrawer = ({
    mobileOpen,
    handleDrawerToggle,
}: MobileDrawerProps) => {
    const navigate = useNavigate();

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
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate(ROUTES.HOME)}>
                        <ListItemIcon>
                            <HomeIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate(ROUTES.MENU)}>
                        <ListItemIcon>
                            <MenuIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Menu" />
                    </ListItemButton>
                </ListItem>
            </List>
        </CustomDrawer>
    );
};
