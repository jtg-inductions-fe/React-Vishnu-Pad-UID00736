import React, { useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
    Alert,
    Button,
    IconButton,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { Image } from './Image';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleSubscribe = () => {
        if (email.trim() !== '') {
            setShowToast(true);
            setEmail('');
        }
    };

    const handleCloseToast = (
        _event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') return;
        setShowToast(false);
    };

    const handleEmailChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setEmail(e.target.value);
    };

    return (
        <>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent='space-between'
                alignItems='flex-start'
                gap={8}
                width='100%'
                bgcolor='secondary.dark'
                py={10}
                px={6}
                sx={{ boxSizing: 'border-box' }}
            >
                <Stack gap={4} maxWidth={320}>
                    <Stack direction='row' alignItems='center' gap={3}>
                        <Image
                            src='logo.png'
                            alt='Food Logo'
                            height='80px'
                            width='auto'
                            objectFit='contain'
                        />
                        <Typography variant='h2' color='secondary.contrastText'>
                            Food App
                        </Typography>
                    </Stack>

                    <Typography variant='body1' color='secondary.contrastText'>
                        Your favorite meals, delivered straight to your door.
                        Experience top-tier quality with lightning-fast
                        delivery!
                    </Typography>

                    <Typography
                        variant='caption'
                        color='secondary.contrastText'
                    >
                        © 2026 FoodieApp. All rights reserved.
                    </Typography>
                </Stack>

                <Stack gap={3}>
                    <Typography variant='h4' color='secondary.contrastText'>
                        Follow Us
                    </Typography>

                    <Stack direction='row' gap={2}>
                        {[FacebookIcon, TwitterIcon, InstagramIcon].map(
                            (Icon, index) => (
                                <IconButton
                                    key={index}
                                    sx={{
                                        color: 'secondary.contrastText',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            color: 'primary.main',
                                            transform: 'scale(1.15)',
                                            backgroundColor:
                                                'rgba(255, 255, 255, 0.05)',
                                        },
                                    }}
                                >
                                    <Icon />
                                </IconButton>
                            ),
                        )}
                    </Stack>
                </Stack>

                <Stack gap={4}>
                    <Stack gap={1}>
                        <Typography variant='h4' color='secondary.contrastText'>
                            Contact Us
                        </Typography>
                        <Typography
                            variant='body2'
                            color='secondary.contrastText'
                        >
                            Josh Technology Group, Gurugram
                        </Typography>
                        <Typography
                            variant='body2'
                            color='secondary.contrastText'
                        >
                            Email: support@foodieapp.com
                        </Typography>
                    </Stack>

                    <Stack direction='row' gap={2}>
                        <TextField
                            placeholder='Your email address'
                            variant='outlined'
                            size='small'
                            value={email}
                            onChange={handleEmailChange}
                            sx={{
                                backgroundColor: 'primary.contrastText',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSubscribe}
                        >
                            Subscribe
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            <Snackbar
                open={showToast}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity='success'
                    variant='filled'
                    sx={{ width: '100%', borderRadius: 2 }}
                >
                    Thanks for subscribing! We&apos;ll keep you updated.
                </Alert>
            </Snackbar>
        </>
    );
};
