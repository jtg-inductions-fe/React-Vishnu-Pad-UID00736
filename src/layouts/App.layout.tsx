import { Header } from 'containers';
import { useAuth } from 'hooks/useAuth.hook';
import { Outlet } from 'react-router-dom';

import {
    Box,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from '@mui/material';

import { userApi } from '@api/user.api';
import { Footer } from '@components';

const AppLayout = () => {
    const { user, token, isAuthenticated } = useAuth();
    const queryId = user?.id ?? 0;

    const { useGetUserProfileQuery } = userApi;

    const { isFetching } = useGetUserProfileQuery(queryId, {
        skip: !isAuthenticated || !user?.id || !token,
    });

    if (isAuthenticated && isFetching) {
        return (
            <Stack
                height='100vh'
                justifyContent='center'
                alignItems='center'
                gap={2}
                bgcolor='background.default'
            >
                <CircularProgress color='primary' />
                <Typography variant='h6' color='text.secondary'>
                    Verifying Session...
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack minHeight='100vh'>
            <Header />

            <Box
                component='main'
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            >
                <Container maxWidth='xl' sx={{ flexGrow: 1, py: 4 }}>
                    <Outlet />
                </Container>
            </Box>

            <Footer />
        </Stack>
    );
};

export default AppLayout;
