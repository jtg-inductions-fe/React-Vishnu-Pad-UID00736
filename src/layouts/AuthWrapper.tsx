import { CircularProgress, Stack, Typography } from '@mui/material';

import { useGetUserProfileQuery } from '../api/user.api';
import { useAuth } from '../hooks/useAuth';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
    const { user, token, isAuthenticated } = useAuth();
    const queryId = user?.id ?? 0;

    const { isFetching } = useGetUserProfileQuery(queryId, {
        skip: !isAuthenticated || !user?.id || !token,
    });

    if (isAuthenticated && isFetching) {
        return (
            <Stack
                height="100vh"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                bgcolor="background.default"
            >
                <CircularProgress color="primary" />
                <Typography variant="h6" color="text.secondary">
                    Verifying Session...
                </Typography>
            </Stack>
        );
    }

    return <>{children}</>;
};
