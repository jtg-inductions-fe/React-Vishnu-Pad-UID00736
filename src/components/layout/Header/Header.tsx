import React from 'react';

import { Image } from 'components/Image';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    CircularProgress,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import { MobileDrawer } from './MobileDrawer';
import { ProfileMenu } from './ProfileMenu';
import { UserData } from '../../../types';

export interface HeaderProps {
    isMobile: boolean;
    isLoading: boolean;
    user?: UserData;
    cartItemCount: number;

    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    mobileOpen: boolean;
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    handleDrawerToggle: () => void;
    handleLogout: () => void;
    handleNavigate: (path: string) => void;
}

export const Header = ({
    isMobile,
    isLoading,
    user,
    cartItemCount,
    anchorEl,
    isMenuOpen,
    mobileOpen,
    handleProfileMenuOpen,
    handleMenuClose,
    handleDrawerToggle,
    handleLogout,
    handleNavigate,
}: HeaderProps) => {
    const location = useLocation();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {isMobile && (
                            <IconButton onClick={handleDrawerToggle} size="xl">
                                <MenuIcon fontSize="inherit" />
                            </IconButton>
                        )}

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            onClick={() => handleNavigate(ROUTES.HOME)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Food Logo"
                                height="4rem"
                                width="auto"
                                objectFit="contain"
                            />

                            {!isMobile && (
                                <Typography variant="h3">Food</Typography>
                            )}
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        {!isMobile && (
                            <>
                                <Button
                                    variant="text"
                                    color={
                                        location.pathname === ROUTES.MENU
                                            ? 'primary'
                                            : 'inherit'
                                    }
                                    onClick={() => handleNavigate(ROUTES.MENU)}
                                >
                                    Menu
                                </Button>

                                <IconButton
                                    size="xl"
                                    onClick={() =>
                                        handleNavigate(ROUTES.MY_CART)
                                    }
                                    color={
                                        location.pathname === ROUTES.MY_CART
                                            ? 'primary'
                                            : 'inherit'
                                    }
                                    sx={{
                                        pr: 3,
                                        color:
                                            location.pathname === ROUTES.MY_CART
                                                ? 'primary.main'
                                                : 'text.primary',
                                    }}
                                >
                                    <Badge
                                        badgeContent={cartItemCount}
                                        color="error"
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                fontSize: '1rem',
                                                height: '1.8rem',
                                                minWidth: '1.8rem',
                                            },
                                        }}
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </>
                        )}

                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : user ? (
                            <>
                                <Avatar
                                    onClick={handleProfileMenuOpen}
                                    sx={{
                                        cursor: 'pointer',
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                    }}
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <ProfileMenu
                                    anchorEl={anchorEl}
                                    isMenuOpen={isMenuOpen}
                                    handleMenuClose={handleMenuClose}
                                    handleLogout={handleLogout}
                                    user={user}
                                />
                            </>
                        ) : (
                            <>
                                {!isMobile && (
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        onClick={() =>
                                            handleNavigate(ROUTES.LOGIN)
                                        }
                                    >
                                        Login
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handleNavigate(ROUTES.REGISTER)
                                    }
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>

            {isMobile && (
                <MobileDrawer
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />
            )}
        </AppBar>
    );
};
