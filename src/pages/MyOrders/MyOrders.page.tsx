import { Box, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { MyOrdersContainer } from '@containers';

export const MyOrdersPage = () => (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto' }}>
        <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD} mb={3}>
            My Orders
        </Typography>

        <MyOrdersContainer />
    </Box>
);
