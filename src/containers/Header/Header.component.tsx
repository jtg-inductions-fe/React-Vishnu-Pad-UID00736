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
    Toolbar,
    Typography,
} from '@mui/material';

import { Image } from '@components/Image';
import { FONT_WEIGHT } from '@constant';
import { ROUTES } from '@routes/routes.constants';

import { HeaderProps } from './Header.types';
import { MobileDrawer, ProfileMenu } from './subComponents';

export const Header = ({
    isMobile,
    user,
    isAuthenticated,
    isOwner,
    cartItemCount,
    anchorEl,
    isMenuOpen,
    mobileOpen,
    currentPath,
    handleProfileMenuOpen,
    handleMenuClose,
    handleDrawerToggle,
    handleLogout,
    handleNavigate,
    handleMobileNavigate,
    handleProfileNavigate,
}: HeaderProps) => (
    <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ flex: 1, justifyContent: 'flex-start' }}
            >
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        size="large"
                        sx={{
                            color: mobileOpen ? 'primary.main' : 'text.primary',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
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
                    {!isMobile && <Typography variant="h3">Food</Typography>}
                </Stack>
            </Stack>

            {!isMobile && (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
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
                            fontWeight: 400,
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
                spacing={2}
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
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.08),
                        },
                    }}
                >
                    <Badge badgeContent={cartItemCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                {isAuthenticated && user ? (
                    <>
                        <IconButton
                            onClick={handleProfileMenuOpen}
                            size="small"
                            color="primary"
                        >
                            <Avatar>
                                {user?.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <ProfileMenu
                            anchorEl={anchorEl}
                            isMenuOpen={isMenuOpen}
                            handleMenuClose={handleMenuClose}
                            handleLogout={handleLogout}
                            isOwner={isOwner}
                            currentPath={currentPath}
                            handleNavigate={handleProfileNavigate}
                        />
                    </>
                ) : (
                    <>
                        {!isMobile && (
                            <Typography
                                variant="body1"
                                onClick={() => handleNavigate(ROUTES.LOGIN)}
                                color="text.primary"
                                sx={{
                                    cursor: 'pointer',
                                    fontWeight: FONT_WEIGHT.REGULAR,
                                    transition: 'color 0.2s',
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                Login
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            size={isMobile ? 'small' : 'large'}
                            onClick={() => handleNavigate(ROUTES.REGISTER)}
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
                currentPath={currentPath}
                handleNavigate={handleMobileNavigate}
            />
        )}
    </AppBar>
);
