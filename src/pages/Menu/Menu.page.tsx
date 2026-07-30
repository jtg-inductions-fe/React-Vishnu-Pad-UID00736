import { useSearchParams } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import { SearchBar } from '@components';
import { MenuListContainer } from '@containers';

export const MenuPage = () => {
    const [searchParams] = useSearchParams();
    const restaurantId = searchParams.get('restaurant_id');
    const restaurantIdNumber = restaurantId ? Number(restaurantId) : undefined;

    return (
        <Stack gap={8}>
            <Stack
                direction={{ md: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={4}
                width='100%'
            >
                <Stack gap={0.5}>
                    <Typography variant='h3'>Full Menu</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Discover all our delicious dishes and beverages
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: (theme) => theme.spacing(100),
                    }}
                >
                    <SearchBar placeholder='Search for dishes, cuisines...' />
                </Box>
            </Stack>

            <MenuListContainer
                layout='grid'
                restaurantId={restaurantIdNumber}
            />
        </Stack>
    );
};
