import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { UserData } from 'types';

import { useMediaQuery, useTheme } from '@mui/material';

import { baseApi } from '@api/base.api';
import { useAppDispatch } from '@store/hooks';

import { Header } from './Header.component';

export const HeaderContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const currentPath = location.pathname;

    const isLoading = false;
    const user: UserData | undefined = { name: 'Vishnu', role: 'owner' };
    const cartItemCount = 1;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(baseApi.util.resetApiState());
        handleMenuClose();
        void navigate('/login');
    };

    const handleNavigate = (path: string) => {
        void navigate(path);
    };

    const handleMobileNavigate = (path: string) => {
        setMobileOpen(false);
        handleNavigate(path);
    };

    const handleProfileNavigate = (path: string) => {
        handleMenuClose();
        handleNavigate(path);
    };

    return (
        <Header
            isMobile={isMobile}
            isLoading={isLoading}
            user={user}
            cartItemCount={cartItemCount}
            anchorEl={anchorEl}
            isMenuOpen={isMenuOpen}
            mobileOpen={mobileOpen}
            currentPath={currentPath}
            handleProfileMenuOpen={handleProfileMenuOpen}
            handleMenuClose={handleMenuClose}
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            handleNavigate={handleNavigate}
            handleMobileNavigate={handleMobileNavigate}
            handleProfileNavigate={handleProfileNavigate}
        />
    );
};
