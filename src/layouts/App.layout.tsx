import { Header } from 'containers';
import { useAuth } from 'hooks/useAuth.hook';
import { Outlet } from 'react-router-dom';

import { CircularProgress, Container, Stack, Typography } from '@mui/material';

import { useUserService } from '@api/user.api';

const AppLayout = () => {
    const { user, token, isAuthenticated } = useAuth();
    const queryId = user?.id ?? 0;

    const { useGetUserProfileQuery } = useUserService();

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
        <>
            <Header />
            <Container maxWidth='xl'>
                <Outlet />
            </Container>
        </>
    );
};

export default AppLayout;
