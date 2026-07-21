import React from 'react';

import { Image } from 'components/Image';
import { ROUTES } from 'routes/constants';

import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Typography } from '@mui/material';

import { StyledAppBar, StyledAvatar, StyledToolbar } from './Header.styles';
import { MobileDrawer } from './MobileDrawer';
import { ProfileMenu } from './ProfileMenu';
import { UserData } from '../../../types';
import { FlexBox } from '../FlexBox';

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

export const Header = ({
    isMobile,
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
    <StyledAppBar>
        <StyledToolbar>
            <FlexBox gap={0}>
                {isMobile && (
                    <IconButton
                        onClick={handleDrawerToggle}
                        color="primary"
                        size="xl"
                    >
                        <MenuIcon fontSize="inherit" />
                    </IconButton>
                )}

                <Image
                    src="/logo.png"
                    alt="Food Logo"
                    height="4rem"
                    width="auto"
                    objectFit="contain"
                    onClick={() => handleNavigate(ROUTES.HOME)}
                />

                {!isMobile && (
                    <Typography
                        variant="h3"
                        color="primary"
                        ml={2}
                        onClick={() => handleNavigate(ROUTES.HOME)}
                        style={{ cursor: 'pointer' }}
                    >
                        Food
                    </Typography>
                )}
            </FlexBox>

            <FlexBox gap={2}>
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
                        <StyledAvatar onClick={handleProfileMenuOpen}>
                            {user.name.charAt(0).toUpperCase()}
                        </StyledAvatar>
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
            </FlexBox>
        </StyledToolbar>

        {isMobile && (
            <MobileDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        )}
    </StyledAppBar>
);
