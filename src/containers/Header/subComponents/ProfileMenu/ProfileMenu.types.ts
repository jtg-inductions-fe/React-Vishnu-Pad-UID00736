export interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    handleLogout: () => void;
    isOwner: boolean;
    handleNavigate: (path: string) => () => void;
}
