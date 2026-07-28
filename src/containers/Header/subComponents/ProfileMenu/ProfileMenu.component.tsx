import {
    Analytics,
    Logout,
    Person,
    Receipt,
    Storefront,
} from '@mui/icons-material';
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
                <Person fontSize='small' />
            </ListItemIcon>
            <Typography variant='body1'>My Profile</Typography>
        </MenuItem>

        <MenuItem onClick={handleNavigate(ROUTES.MY_ORDERS)}>
            <ListItemIcon>
                <Receipt fontSize='small' />
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
                    <Storefront fontSize='small' />
                </ListItemIcon>
                <Typography variant='body1'>My Restaurant</Typography>
            </MenuItem>,
            <MenuItem
                key='analytics'
                onClick={handleNavigate(ROUTES.MY_RESTAURANTS_ANALYTICS_ALL)}
            >
                <ListItemIcon>
                    <Analytics fontSize='small' />
                </ListItemIcon>
                <Typography variant='body1'>Analytics</Typography>
            </MenuItem>,
        ]}

        <Divider />

        <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <Logout fontSize='small' color='error' />
            </ListItemIcon>
            <Typography variant='body1' color='error'>
                Logout
            </Typography>
        </MenuItem>
    </Menu>
);
