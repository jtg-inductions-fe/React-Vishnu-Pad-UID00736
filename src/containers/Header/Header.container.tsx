import React, { useState } from 'react';

import { useAuth, useLogout } from 'hooks';
import { NavLink, useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    alpha,
    AppBar,
    Avatar,
    Badge,
    Button,
    IconButton,
    Stack,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { Image } from '@components/Image';
import { FONT_WEIGHT } from '@constant';
import { ROUTES } from '@routes/routes.constants';

import { MobileDrawer, ProfileMenu } from './subComponents';

const DESKTOP_NAV_LINKS = [
    { label: 'Menu', path: ROUTES.MENU, baseWeight: FONT_WEIGHT.LIGHT },
    {
        label: 'Restaurants',
        path: ROUTES.RESTAURANTS,
        baseWeight: FONT_WEIGHT.LIGHT,
    },
];

const getNavLinkStyles = (baseWeight: number | string) => ({
    textDecoration: 'none',
    color: 'text.primary',
    cursor: 'pointer',
    fontWeight: baseWeight,
    transition: 'color 0.2s',
    '&:hover, &.active': {
        color: 'primary.main',
    },
    '&.active': {
        fontWeight: FONT_WEIGHT.MEDIUM,
    },
});

const cartButtonStyles = {
    color: 'text.primary',
    transition: 'all 0.2s ease',
    '&:hover, &.active': {
        color: 'primary.main',
        backgroundColor: (theme: Theme) =>
            alpha(theme.palette.primary.main, 0.08),
    },
};

export const Header = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user, isAuthenticated, isOwner } = useAuth();
    const executeLogout = useLogout();
    const cartItemCount = 1;

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
                            <MenuIcon fontSize='inherit' />
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
                                <Typography
                                    key={path}
                                    component={NavLink}
                                    to={path}
                                    variant='body1'
                                    sx={getNavLinkStyles(baseWeight)}
                                >
                                    {label}
                                </Typography>
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
                    <IconButton
                        component={NavLink}
                        to={ROUTES.MY_CART}
                        size='medium'
                        sx={cartButtonStyles}
                    >
                        <Badge badgeContent={cartItemCount} color='error'>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

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
                                <Typography
                                    component={NavLink}
                                    to={ROUTES.LOGIN}
                                    variant='body1'
                                    sx={getNavLinkStyles(FONT_WEIGHT.REGULAR)}
                                >
                                    Login
                                </Typography>
                            )}
                            <Button
                                component={NavLink}
                                to={ROUTES.REGISTER}
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
