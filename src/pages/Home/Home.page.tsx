import { Stack, Typography } from '@mui/material';

import { MenuListContainer, RestaurantListContainer } from '@containers';

export const HomePage = () => (
    <Stack gap={8}>
        <Stack gap={0.5}>
            <Typography variant='h3'>Explore Best Food</Typography>
            <Typography variant='body1' color='text.secondary'>
                Discover top-rated restaurants and dishes near you
            </Typography>
        </Stack>

        <RestaurantListContainer layout='horizontal' limit={10} />

        <MenuListContainer layout='horizontal' limit={10} />
    </Stack>
);
