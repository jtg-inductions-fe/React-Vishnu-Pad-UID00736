import { Box, Stack, Typography } from '@mui/material';

import { SearchBar } from '@components';
import { RestaurantListContainer } from '@containers';

export const RestaurantsPage = () => (
    <Stack gap={8}>
        <Stack
            direction={{ md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', md: 'center' }}
            gap={4}
            width='100%'
        >
            <Stack gap={0.5}>
                <Typography variant='h3'>All Restaurants</Typography>
                <Typography variant='body1' color='text.secondary'>
                    Explore our complete list of top-rated restaurants
                </Typography>
            </Stack>
            <Box
                sx={(theme) => ({
                    width: { xs: '100%', maxWidth: theme.spacing(100) },
                })}
            >
                <SearchBar placeholder='Search for restaurants, cuisines...' />
            </Box>
        </Stack>

        <RestaurantListContainer layout='grid' />
    </Stack>
);
