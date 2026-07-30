import { Stack, Typography } from '@mui/material';

import { MenuManagerContainer } from '@containers';

export const MenuManagerPage = () => (
    <Stack gap={8}>
        <Stack gap={1}>
            <Typography variant='h3'>Menu Manager</Typography>
            <Typography variant='body1' color='text.secondary'>
                Add, edit, or remove dishes for this restaurant.
            </Typography>
        </Stack>

        <MenuManagerContainer />
    </Stack>
);
