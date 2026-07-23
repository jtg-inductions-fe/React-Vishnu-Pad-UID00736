export interface MobileDrawerProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    handleNavigate: (path: string) => () => void;
}
