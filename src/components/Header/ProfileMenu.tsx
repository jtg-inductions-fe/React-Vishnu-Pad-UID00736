import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';

/** Props for the user profile dropdown menu */
interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleLogout: () => void;
    isOwner: boolean;
}

export const ProfileMenu = ({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleLogout,
    isOwner,
}: ProfileMenuProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        handleMenuClose();
        void navigate(path);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
                paper: {
                    elevation: 3,
                },
            }}
        >
            <MenuItem
                selected={location.pathname === ROUTES.PROFILE}
                onClick={() => handleNavigate(ROUTES.PROFILE)}
            >
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1">My Profile</Typography>
            </MenuItem>

            <MenuItem
                selected={location.pathname === ROUTES.MY_ORDERS}
                onClick={() => handleNavigate(ROUTES.MY_ORDERS)}
            >
                <ListItemIcon>
                    <ReceiptIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1">My Orders</Typography>
            </MenuItem>

            {isOwner && [
                <Divider key="divider" />,
                <MenuItem
                    key="restaurant"
                    selected={location.pathname === ROUTES.MY_RESTAURANT}
                    onClick={() => handleNavigate(ROUTES.MY_RESTAURANT)}
                >
                    <ListItemIcon>
                        <StorefrontIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1">My Restaurant</Typography>
                </MenuItem>,
                <MenuItem
                    key="analytics"
                    selected={location.pathname === ROUTES.ANALYTICS}
                    onClick={() => handleNavigate(ROUTES.ANALYTICS)}
                >
                    <ListItemIcon>
                        <AnalyticsIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body1">Analytics</Typography>
                </MenuItem>,
            ]}

            <Divider />

            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <Typography variant="body1" color="error">
                    Logout
                </Typography>
            </MenuItem>
        </Menu>
    );
};
