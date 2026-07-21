import React from 'react';

import { Image } from 'components/Image';
import { ROUTES } from 'routes/constants';

import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { MobileDrawer } from './MobileDrawer';
import { ProfileMenu } from './ProfileMenu';
import { UserData } from '../../../types';

/** Header UI props */
export interface HeaderProps {
    isMobile: boolean;
    isLoading: boolean;
    user?: UserData;
    /** Anchor element for MUI Profile Menu */
    anchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    /** Drawer visibility state */
    mobileOpen: boolean;
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    handleDrawerToggle: () => void;
    handleLogout: () => void;
    handleNavigate: (path: string) => void;
}

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

export const Header = ({
    isMobile,
    isLoading,
    user,
    anchorEl,
    isMenuOpen,
    mobileOpen,
    handleProfileMenuOpen,
    handleMenuClose,
    handleDrawerToggle,
    handleLogout,
    handleNavigate,
}: HeaderProps) => (
    <CustomAppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    {isMobile && (
                        <IconButton
                            onClick={handleDrawerToggle}
                            color="primary"
                            size="large"
                        >
                            <MenuIcon fontSize="inherit" />
                        </IconButton>
                    )}

                    <Box
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => handleNavigate(ROUTES.HOME)}
                    >
                        <Image
                            src="/logo.png"
                            alt="Food Logo"
                            height="4rem"
                            width="auto"
                            objectFit="contain"
                        />
                    </Box>

                    {!isMobile && (
                        <Typography
                            variant="h3"
                            color="primary"
                            ml={2}
                            onClick={() => handleNavigate(ROUTES.HOME)}
                            sx={{ cursor: 'pointer' }}
                        >
                            Food
                        </Typography>
                    )}
                </Stack>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {!isMobile && (
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => handleNavigate(ROUTES.MENU)}
                        >
                            Menu
                        </Button>
                    )}

                    {isLoading ? (
                        <CircularProgress size={24} color="primary" />
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
                            />
                        </>
                    ) : (
                        <>
                            {!isMobile && (
                                <Button
                                    variant="text"
                                    color="inherit"
                                    onClick={() => handleNavigate(ROUTES.LOGIN)}
                                >
                                    Login
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleNavigate(ROUTES.REGISTER)}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Stack>
        </Toolbar>

        {isMobile && (
            <MobileDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        )}
    </CustomAppBar>
);
