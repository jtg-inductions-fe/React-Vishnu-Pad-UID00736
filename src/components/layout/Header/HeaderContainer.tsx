import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { useMediaQuery, useTheme } from '@mui/material';

import { Header } from './Header';
import { baseApi } from '../../../api/baseApi';
import { useAuth } from '../../../hooks/useAuth';
import { logout } from '../../../store/authSlice';
import { useAppDispatch } from '../../../store/hooks';

export const HeaderContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Mock data: Replace with actual RTK Query / Auth state later
    const isLoading = false;
    const user: UserData | undefined = { name: 'Vishnu Pad', role: 'user' };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        handleMenuClose();
        void navigate(ROUTES.LOGIN);
    };

    const handleNavigate = (path: string) => {
        void navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    return (
        <Header
            isMobile={isMobile}
            user={user}
            anchorEl={anchorEl}
            isMenuOpen={isMenuOpen}
            mobileOpen={mobileOpen}
            handleProfileMenuOpen={handleProfileMenuOpen}
            handleMenuClose={handleMenuClose}
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            handleNavigate={handleNavigate}
        />
    );
};
