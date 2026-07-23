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

import { ROUTES } from '@routes/routes.constants';

import { ProfileMenuProps } from './ProfileMenu.types';

export const ProfileMenu = ({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleLogout,
    user,
    currentPath,
    handleNavigate,
}: ProfileMenuProps) => (
    <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{ paper: { elevation: 3 } }}
    >
        <MenuItem
            selected={currentPath === ROUTES.PROFILE}
            onClick={() => handleNavigate(ROUTES.PROFILE)}
        >
            <ListItemIcon>
                <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">My Profile</Typography>
        </MenuItem>
        <MenuItem
            selected={currentPath === ROUTES.MY_ORDERS}
            onClick={() => handleNavigate(ROUTES.MY_ORDERS)}
        >
            <ListItemIcon>
                <ReceiptIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">My Orders</Typography>
        </MenuItem>

        {user?.role === 'owner' && [
            <Divider key="divider" />,
            <MenuItem
                key="restaurant"
                selected={currentPath === ROUTES.MY_RESTAURANT}
                onClick={() => handleNavigate(ROUTES.MY_RESTAURANT)}
            >
                <ListItemIcon>
                    <StorefrontIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1">My Restaurant</Typography>
            </MenuItem>,
            <MenuItem
                key="analytics"
                selected={currentPath === ROUTES.ANALYTICS}
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
