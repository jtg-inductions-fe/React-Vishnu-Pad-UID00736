import { Stack, Typography } from '@mui/material';

import { ProfileContainer } from '@containers/Profile';

export const ProfilePage = () => (
    <Stack gap={4}>
        <Typography variant='h3'>Command Center</Typography>

        <ProfileContainer />
    </Stack>
);
