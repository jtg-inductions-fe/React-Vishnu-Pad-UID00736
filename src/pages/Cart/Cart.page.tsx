import { Stack, Typography } from '@mui/material';

import { CartContainer } from '@containers/Cart';

export const CartPage = () => (
    <Stack>
        <Typography variant='h3'>Your Cart</Typography>

        <CartContainer />
    </Stack>
);
