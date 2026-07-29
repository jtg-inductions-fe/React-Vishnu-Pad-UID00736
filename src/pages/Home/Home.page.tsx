import { Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { MenuListContainer, RestaurantListContainer } from '@containers';

export const HomePage = () => (
    <Stack gap={8} px={{ xs: 2, md: 4 }} py={4}>
        <Stack gap={0.5}>
            <Typography variant='h3' fontWeight={FONT_WEIGHT.BOLD}>
                Explore Best Food
            </Typography>
            <Typography variant='body1' color='text.secondary'>
                Discover top-rated restaurants and dishes near you
            </Typography>
        </Stack>

        <RestaurantListContainer layout='horizontal' limit={10} />

        <MenuListContainer layout='horizontal' limit={10} />
    </Stack>
);
