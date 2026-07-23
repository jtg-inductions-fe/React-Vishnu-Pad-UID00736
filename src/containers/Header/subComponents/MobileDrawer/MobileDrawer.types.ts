export interface MobileDrawerProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    currentPath: string;
    handleNavigate: (path: string) => void;
}
