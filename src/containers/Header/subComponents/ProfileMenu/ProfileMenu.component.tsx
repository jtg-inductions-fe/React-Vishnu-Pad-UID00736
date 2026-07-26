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

import { ROUTES } from '@constant';

import { ProfileMenuProps } from './ProfileMenu.types';

export const ProfileMenu = ({
    anchorEl,
    isMenuOpen,
    handleMenuClose,
    handleLogout,
    isOwner,
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
        <MenuItem onClick={handleNavigate(ROUTES.PROFILE)}>
            <ListItemIcon>
                <PersonIcon fontSize='small' />
            </ListItemIcon>
            <Typography variant='body1'>My Profile</Typography>
        </MenuItem>

        <MenuItem onClick={handleNavigate(ROUTES.MY_ORDERS)}>
            <ListItemIcon>
                <ReceiptIcon fontSize='small' />
            </ListItemIcon>
            <Typography variant='body1'>My Orders</Typography>
        </MenuItem>

        {isOwner && [
            <Divider key='divider' />,
            <MenuItem
                key='restaurant'
                onClick={handleNavigate(ROUTES.MY_RESTAURANTS)}
            >
                <ListItemIcon>
                    <StorefrontIcon fontSize='small' />
                </ListItemIcon>
                <Typography variant='body1'>My Restaurant</Typography>
            </MenuItem>,
            <MenuItem
                key='analytics'
                onClick={handleNavigate(ROUTES.MY_RESTAURANTS_ANALYTICS_ALL)}
            >
                <ListItemIcon>
                    <AnalyticsIcon fontSize='small' />
                </ListItemIcon>
                <Typography variant='body1'>Analytics</Typography>
            </MenuItem>,
        ]}

        <Divider />
        <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <LogoutIcon fontSize='small' color='error' />
            </ListItemIcon>
            <Typography variant='body1' color='error'>
                Logout
            </Typography>
        </MenuItem>
    </Menu>
);
