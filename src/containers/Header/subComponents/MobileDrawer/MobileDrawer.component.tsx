import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { DRAWER_ITEMS } from './MobileDrawer.constants';
import { CustomDrawer, StyledMobileNavLink } from './MobileDrawer.styles';
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
                    <StyledMobileNavLink
                        to={path}
                        onClick={handleNavigate(path)}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                            <IconComponent />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </StyledMobileNavLink>
                </ListItem>
            ))}
        </List>
    </CustomDrawer>
);
