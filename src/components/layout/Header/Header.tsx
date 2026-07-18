import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { Button, CircularProgress } from '@mui/material';

import {
    DesktopLoginButton,
    LeftSection,
    LogoImage,
    LogoText,
    MenuButton,
    MobileMenuIcon,
    RightSection,
    StyledAppBar,
    StyledAvatar,
    StyledToolbar,
} from './Header.styles';
import { MobileDrawer } from './MobileDrawer';
import { ProfileMenu } from './ProfileMenu';
import { baseApi } from '../../../api/baseApi';
import { useAppDispatch } from '../../../store/hooks';
import { UserData } from '../../../types';

export const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Dummy for now ......
    const isLoading = false;
    const user: UserData = {
        name: 'Vishnu Pad',
        role: 'user',
    };
    // const user = undefined as UserData | undefined;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(baseApi.util.resetApiState());
        handleMenuClose();
        void navigate('/login');
    };

    return (
        <StyledAppBar>
            <StyledToolbar>
                <LeftSection>
                    <MobileMenuIcon onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </MobileMenuIcon>
                    <LogoImage
                        src="/logo.png"
                        alt="Bite Logo"
                        onClick={() => void navigate('/')}
                    />
                    <LogoText onClick={() => void navigate('/')}>Food</LogoText>
                </LeftSection>

                <RightSection>
                    <MenuButton
                        onClick={() => void navigate('/menu')}
                        sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                        Menu
                    </MenuButton>

                    {isLoading ? (
                        <CircularProgress size={24} color="primary" />
                    ) : user ? (
                        <>
                            <StyledAvatar onClick={handleProfileMenuOpen}>
                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : 'U'}
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
                            <DesktopLoginButton
                                variant="text"
                                color="inherit"
                                onClick={() => void navigate('/login')}
                            >
                                Login
                            </DesktopLoginButton>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => void navigate('/register')}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </RightSection>
            </StyledToolbar>

            <MobileDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
        </StyledAppBar>
    );
};
