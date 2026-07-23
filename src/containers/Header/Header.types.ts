import React from 'react';

import { User } from 'types';

export interface HeaderProps {
    isMobile: boolean;
    isAuthenticated: boolean;
    isOwner: boolean;
    user: User | null;
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
