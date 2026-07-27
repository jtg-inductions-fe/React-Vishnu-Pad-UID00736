import { NavLink } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { DRAWER_ITEMS } from './MobileDrawer.constants';
import { activeLinkStyles, CustomDrawer } from './MobileDrawer.styles';
import { MobileDrawerProps } from './MobileDrawer.types';

export const MobileDrawer = ({
    mobileOpen,
    handleDrawerToggle,
    handleNavigate,
}: MobileDrawerProps) => (
    <CustomDrawer
        anchor='left'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant='temporary'
        ModalProps={{
            keepMounted: true,
        }}
    >
        <List sx={{ pt: 2 }}>
            {DRAWER_ITEMS.map(({ label, path, icon: IconComponent }) => (
                <ListItem disablePadding key={path}>
                    <ListItemButton
                        component={NavLink}
                        to={path}
                        onClick={handleNavigate(path)}
                        sx={activeLinkStyles}
                    >
                        <ListItemIcon>
                            <IconComponent />
                        </ListItemIcon>{' '}
                        <ListItemText primary={label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </CustomDrawer>
);
