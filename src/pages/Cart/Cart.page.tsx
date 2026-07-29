import { Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { CartContainer } from '@containers/Cart';

export const CartPage = () => (
    <Stack gap={4} px={{ xs: 2, md: 4 }} py={4} maxWidth='xl' mx='auto'>
        <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
            Your Cart
        </Typography>

        <CartContainer />
    </Stack>
);
