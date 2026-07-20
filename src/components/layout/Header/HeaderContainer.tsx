import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMediaQuery, useTheme } from '@mui/material';

import { Header } from './Header';
import { baseApi } from '../../../api/baseApi';
import { useAppDispatch } from '../../../store/hooks';
import { UserData } from '../../../types';

/**
 * Container component for Header.
 * Manages state, Redux actions, and routing logic separately from UI.
 */
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

    /** Clears user session, resets RTK Query cache, and redirects to login */
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(baseApi.util.resetApiState());
        handleMenuClose();
        void navigate('/login');
    };

    const handleNavigate = (path: string) => {
        void navigate(path);
    };

    return (
        <Header
            isMobile={isMobile}
            isLoading={isLoading}
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
