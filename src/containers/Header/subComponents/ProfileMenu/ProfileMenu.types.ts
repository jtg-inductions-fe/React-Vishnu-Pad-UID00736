export interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleLogout: () => void;
    user?: { name: string; role: string };
    currentPath: string;
    handleNavigate: (path: string) => void;
}
