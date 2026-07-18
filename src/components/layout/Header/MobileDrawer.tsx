import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { DrawerHeader, LogoImage, StyledDrawer } from './Header.styles';

interface MobileDrawerProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

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
        <StyledDrawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
        >
            <DrawerHeader>
                <LogoImage src="/logo.png" alt="Food Logo" />
            </DrawerHeader>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate('/menu')}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText primary="Menu" />
                    </ListItemButton>
                </ListItem>
            </List>
        </StyledDrawer>
    );
};
