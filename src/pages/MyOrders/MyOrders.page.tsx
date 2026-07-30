import { Stack, Typography } from '@mui/material';

import { MyOrdersContainer } from '@containers';

export const MyOrdersPage = () => (
    <Stack gap={4}>
        <Typography variant='h4' mb={3}>
            My Orders
        </Typography>

        <MyOrdersContainer />
    </Stack>
);
