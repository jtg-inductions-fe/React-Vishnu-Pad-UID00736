import React, { useState } from 'react';

import { useAuth, useLogout } from 'hooks';
import { useNavigate } from 'react-router-dom';

import { Menu, ShoppingCart } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { Image } from '@components';
import { FONT_WEIGHT } from '@constant';
import { ROUTES } from '@constant';
import { useAppSelector } from '@store/hooks';

import { DESKTOP_NAV_LINKS } from './Header.constants';
import {
    cartButtonStyles,
    navLinkBaseStyles,
    StyledNavLink,
} from './Header.styles';
import { MobileDrawer, ProfileMenu } from './subComponents';

export const Header = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user, isAuthenticated, isOwner } = useAuth();
    const executeLogout = useLogout();
    const cartItemCount = useAppSelector((state) => state.cart.totalQuantity);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleNavigate = (path: string) => () => {
        void navigate(path);
    };

    const handleMobileNavigate = (path: string) => () => {
        setMobileOpen(false);
        void navigate(path);
    };

    const handleLogoutClick = () => {
        void executeLogout();
        handleMenuClose();
    };

    const handleProfileNavigate = (path: string) => () => {
        handleMenuClose();
        void navigate(path);
    };

    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack
                    direction='row'
                    alignItems='center'
                    gap={1}
                    sx={{ flex: 1, justifyContent: 'flex-start' }}
                >
                    {isMobile && (
                        <IconButton
                            onClick={handleDrawerToggle}
                            size='large'
                            sx={{
                                color: mobileOpen
                                    ? 'primary.main'
                                    : 'text.primary',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <Menu fontSize='inherit' />
                        </IconButton>
                    )}

                    <Stack
                        direction='row'
                        alignItems='center'
                        gap={1}
                        onClick={handleNavigate(ROUTES.HOME)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Image
                            src='/logo.png'
                            alt='Food Logo'
                            height={theme.spacing(10)}
                            width='auto'
                            objectFit='contain'
                        />
                        {!isMobile && (
                            <Typography variant='h3'>Food</Typography>
                        )}
                    </Stack>
                </Stack>

                {!isMobile && (
                    <Stack
                        direction='row'
                        alignItems='center'
                        gap={4}
                        sx={{ flex: 1, justifyContent: 'center' }}
                    >
                        {DESKTOP_NAV_LINKS.map(
                            ({ label, path, baseWeight }) => (
                                <StyledNavLink
                                    key={path}
                                    to={path}
                                    sx={[
                                        navLinkBaseStyles,
                                        { fontWeight: baseWeight },
                                    ]}
                                >
                                    {label}
                                </StyledNavLink>
                            ),
                        )}
                    </Stack>
                )}

                <Stack
                    direction='row'
                    gap={8}
                    alignItems='center'
                    sx={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <Tooltip title='My Cart' arrow>
                        <IconButton
                            onClick={handleNavigate(ROUTES.MY_CART)}
                            size='medium'
                            sx={cartButtonStyles}
                        >
                            <Badge badgeContent={cartItemCount} color='error'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {isAuthenticated && user ? (
                        <>
                            <IconButton
                                onClick={handleProfileMenuOpen}
                                size='small'
                                color='primary'
                            >
                                <Avatar>
                                    {user?.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <ProfileMenu
                                anchorEl={anchorEl}
                                isMenuOpen={isMenuOpen}
                                handleMenuClose={handleMenuClose}
                                isOwner={isOwner}
                                handleLogout={handleLogoutClick}
                                handleNavigate={handleProfileNavigate}
                            />
                        </>
                    ) : (
                        <>
                            {!isMobile && (
                                <StyledNavLink
                                    to={ROUTES.LOGIN}
                                    sx={[
                                        navLinkBaseStyles,
                                        { fontWeight: FONT_WEIGHT.REGULAR },
                                    ]}
                                >
                                    Login
                                </StyledNavLink>
                            )}
                            <Button
                                onClick={handleNavigate(ROUTES.REGISTER)}
                                variant='contained'
                                size='small'
                                sx={{ px: 4, py: 2 }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Stack>
            </Toolbar>

            {isMobile && (
                <MobileDrawer
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    handleNavigate={handleMobileNavigate}
                />
            )}
        </AppBar>
    );
};
