import { Grid2, Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { useAppSelector } from '@store/hooks';

import { DangerZone } from './components/DangerZone.component';
import { ProfileDetails } from './components/ProfileDetails.component';
import { WalletSection } from './components/WalletSection.component';

export const ProfilePage = () => {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) return null;

    return (
        <Stack gap={4} px={{ xs: 2, md: 4 }} py={4} maxWidth='xl' mx='auto'>
            <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
                Command Center
            </Typography>

            <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                    <Stack spacing={4}>
                        <ProfileDetails user={user} />
                        <DangerZone user={user} />
                    </Stack>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <WalletSection user={user} />
                </Grid2>
            </Grid2>
        </Stack>
    );
};
