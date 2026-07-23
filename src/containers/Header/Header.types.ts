import React from 'react';

import { UserData } from 'types';

export interface HeaderProps {
    isMobile: boolean;
    isLoading: boolean;
    user?: UserData;
    cartItemCount: number;

    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    mobileOpen: boolean;
    currentPath: string;

    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    handleDrawerToggle: () => void;
    handleLogout: () => void;
    handleNavigate: (path: string) => void;
    handleMobileNavigate: (path: string) => void;
    handleProfileNavigate: (path: string) => void;
}
