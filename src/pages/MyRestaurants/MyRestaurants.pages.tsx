import { Stack, Typography } from '@mui/material';

import { MyRestaurantsContainer } from '@containers';

export const MyRestaurantsPage = () => (
    <Stack gap={8}>
        <Stack gap={1}>
            <Typography variant='h3'>My Restaurants</Typography>
            <Typography variant='body1' color='text.secondary'>
                Manage your restaurant menus and view performance analytics.
            </Typography>
        </Stack>

        <MyRestaurantsContainer />
    </Stack>
);
