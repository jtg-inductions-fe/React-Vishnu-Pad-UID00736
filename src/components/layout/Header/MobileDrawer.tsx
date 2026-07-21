import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { StyledDrawer } from './Header.styles';

/** Props for the mobile navigation drawer */
interface MobileDrawerProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

/** Renders the side navigation drawer for mobile viewports */
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
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate(ROUTES.HOME)}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigate(ROUTES.MENU)}>
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
