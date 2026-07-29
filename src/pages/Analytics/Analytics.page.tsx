import { Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { AnalyticsContainer } from '@containers';

export const AnalyticsPage = () => (
    <Stack gap={4} px={{ xs: 2, md: 4 }} py={4}>
        <Stack gap={0.5}>
            <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
                Analytics Dashboard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
                Track your performance, top items, and best customers.
            </Typography>
        </Stack>

        <AnalyticsContainer />
    </Stack>
);
