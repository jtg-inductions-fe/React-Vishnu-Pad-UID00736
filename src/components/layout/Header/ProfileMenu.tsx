import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Divider, ListItemIcon, MenuItem } from '@mui/material';

import { LogoutMenuItem, StyledMenu } from './Header.styles';

/** Props for the user profile dropdown menu */
interface ProfileMenuProps {
    /** Element to anchor the dropdown menu to */
    anchorEl: null | HTMLElement;
    /** Visibility state of the menu */
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleLogout: () => void;
    user?: { name: string; role: string };
}

/** Renders the profile dropdown menu with role-based navigation links */
export const ProfileMenu = ({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleLogout,
    user,
}: ProfileMenuProps) => {
    const navigate = useNavigate();

    /** Closes the menu before navigating to the specified route */
    const handleNavigate = (path: string) => {
        handleMenuClose();
        void navigate(path);
    };

    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{ paper: { elevation: 0 } }}
        >
            <MenuItem onClick={() => handleNavigate(ROUTES.PROFILE)}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                My Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigate(ROUTES.MY_CART)}>
                <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                </ListItemIcon>
                My Cart
            </MenuItem>
            <MenuItem onClick={() => handleNavigate(ROUTES.MY_ORDERS)}>
                <ListItemIcon>
                    <ReceiptIcon fontSize="small" />
                </ListItemIcon>
                My Orders
            </MenuItem>

            {/* Additional menu items exclusively for restaurant owners */}
            {user?.role === 'owner' && [
                <Divider key="divider" />,
                <MenuItem
                    key="restaurant"
                    onClick={() => handleNavigate(ROUTES.MY_RESTAURANT)}
                >
                    <ListItemIcon>
                        <StorefrontIcon fontSize="small" />
                    </ListItemIcon>
                    My Restaurant
                </MenuItem>,
                <MenuItem
                    key="analytics"
                    onClick={() => handleNavigate(ROUTES.ANALYTICS)}
                >
                    <ListItemIcon>
                        <AnalyticsIcon fontSize="small" />
                    </ListItemIcon>
                    Analytics
                </MenuItem>,
            ]}

            <Divider />
            <LogoutMenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                Logout
            </LogoutMenuItem>
        </StyledMenu>
    );
};
