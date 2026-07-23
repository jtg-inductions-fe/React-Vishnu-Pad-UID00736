export interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleLogout: () => void;
    isOwner: boolean;
    currentPath: string;
    handleNavigate: (path: string) => void;
}
