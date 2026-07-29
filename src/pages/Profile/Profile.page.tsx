import { Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { ProfileContainer } from '@containers/Profile';

export const ProfilePage = () => (
    <Stack gap={4} px={{ xs: 2, md: 4 }} py={4} maxWidth='xl' mx='auto'>
        <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
            Command Center
        </Typography>

        <ProfileContainer />
    </Stack>
);
