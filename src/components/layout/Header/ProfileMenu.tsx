import { useNavigate } from 'react-router-dom';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Divider, ListItemIcon, MenuItem } from '@mui/material';

import { LogoutMenuItem, StyledMenu } from './Header.styles';

interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleLogout: () => void;
    user?: { name: string; role: string };
}

export const ProfileMenu = ({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleLogout,
    user,
}: ProfileMenuProps) => {
    const navigate = useNavigate();

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
            <MenuItem onClick={() => handleNavigate('/profile')}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                My Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/cart')}>
                <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                </ListItemIcon>
                My Cart
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/orders')}>
                <ListItemIcon>
                    <ReceiptIcon fontSize="small" />
                </ListItemIcon>
                My Orders
            </MenuItem>

            {user?.role === 'owner' && [
                <Divider key="divider" />,
                <MenuItem
                    key="restaurant"
                    onClick={() => handleNavigate('/restaurant')}
                >
                    <ListItemIcon>
                        <StorefrontIcon fontSize="small" />
                    </ListItemIcon>
                    My Restaurant
                </MenuItem>,
                <MenuItem
                    key="analytics"
                    onClick={() => handleNavigate('/analytics')}
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
