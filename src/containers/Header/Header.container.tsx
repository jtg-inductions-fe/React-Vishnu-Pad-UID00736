import React, { useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'types';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    alpha,
    AppBar,
    Avatar,
    Badge,
    Button,
    CircularProgress,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { baseApi } from '@api/base.api';
import { Image } from '@components/Image';
import { FONT_WEIGHT } from '@constant';
import { ROUTES } from '@routes/routes.constants';
import { useAppDispatch } from '@store/hooks';


import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { useMediaQuery, useTheme } from '@mui/material';

import { Header } from './Header';
import { baseApi } from '../../api/base.api';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';


export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth;()
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const currentPath = location.pathname;


    const isLoading = false;
    const user: UserData | undefined = { name: 'Vishnu Pad', role: 'owner' };
    const cartItemCount = 1;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        handleMenuClose();
        void navigate(ROUTES.LOGIN || '/login');
    };

    const handleNavigate = (path: string) => {
        void navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
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
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    sx={{ flex: 1, justifyContent: 'flex-start' }}
                >
                    {isMobile && (
                        <IconButton
                            onClick={handleDrawerToggle}
                            size="large"
                            sx={{
                                color: mobileOpen
                                    ? 'primary.main'
                                    : 'text.primary',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <MenuIcon fontSize="inherit" />
                        </IconButton>
                    )}

                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        onClick={() => handleNavigate(ROUTES.HOME)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Image
                            src="/logo.png"
                            alt="Food Logo"
                            height={theme.spacing(10)}
                            width="auto"
                            objectFit="contain"
                        />
                        {!isMobile && (
                            <Typography variant="h3">Food</Typography>
                        )}
                    </Stack>
                </Stack>

                {!isMobile && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={4}
                        sx={{ flex: 1, justifyContent: 'center' }}
                    >
                        <Typography
                            variant="body1"
                            onClick={() => handleNavigate(ROUTES.MENU)}
                            color={
                                currentPath === ROUTES.MENU
                                    ? 'primary.main'
                                    : 'text.primary'
                            }
                            sx={{
                                cursor: 'pointer',
                                fontWeight: FONT_WEIGHT.REGULAR,
                                transition: 'color 0.2s',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            Menu
                        </Typography>

                        <Typography
                            variant="body1"
                            onClick={() => handleNavigate(ROUTES.RESTAURANTS)}
                            color={
                                currentPath === ROUTES.RESTAURANTS
                                    ? 'primary.main'
                                    : 'text.primary'
                            }
                            sx={{
                                cursor: 'pointer',
                                fontWeight: FONT_WEIGHT.LIGHT,
                                transition: 'color 0.2s',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            Restaurants
                        </Typography>
                    </Stack>
                )}

                <Stack
                    direction="row"
                    gap={8}
                    alignItems="center"
                    sx={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <IconButton
                        size="medium"
                        onClick={() => handleNavigate(ROUTES.MY_CART)}
                        sx={{
                            color:
                                currentPath === ROUTES.MY_CART
                                    ? 'primary.main'
                                    : 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: 'primary.main',
                                backgroundColor: () =>
                                    alpha(theme.palette.primary.main, 0.08),
                            },
                        }}
                    >
                        <Badge badgeContent={cartItemCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {isLoading ? (
                        <CircularProgress size={24} />
                    ) : user ? (
                        <>
                            <Avatar
                                onClick={handleProfileMenuOpen}
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: 'primary.main',
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
                                currentPath={currentPath}
                                handleNavigate={handleProfileNavigate}
                            />
                        </>
                    ) : (
                        <Stack direction="row" gap={6} alignItems="center">
                            {!isMobile && (
                                <Typography
                                    variant="body1"
                                    onClick={() => handleNavigate(ROUTES.LOGIN)}
                                    color="text.primary"
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        '&:hover': { color: 'primary.main' },
                                    }}
                                >
                                    Login
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleNavigate(ROUTES.REGISTER)}
                                sx={{ px: 4, py: 2 }}
                            >
                                Register
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Toolbar>

            {isMobile && (
                <MobileDrawer
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    currentPath={currentPath}
                    handleNavigate={handleMobileNavigate}
                />
            )}
        </AppBar>
    );
};
