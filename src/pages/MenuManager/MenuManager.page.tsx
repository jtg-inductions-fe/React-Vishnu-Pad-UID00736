import { Stack, Typography } from '@mui/material';

import { MenuManagerContainer } from '@containers/MenuManagerPage';

export const MenuManagerPage = () => (
    <Stack gap={7} px={{ xs: 2, md: 4 }} py={4}>
        <Stack
            direction={{ md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', md: 'center' }}
            gap={4}
        >
            <Stack gap={1}>
                <Typography variant='h3'>Menu Manager</Typography>
                <Typography variant='body1' color='text.secondary'>
                    Add, edit, or remove dishes for this restaurant.
                </Typography>
            </Stack>
        </Stack>

        <MenuManagerContainer />
    </Stack>
);
