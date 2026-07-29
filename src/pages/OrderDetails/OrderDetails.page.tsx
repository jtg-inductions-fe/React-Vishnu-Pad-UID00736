import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { OrderDetailsContainer } from '@containers';

export const OrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 'xl', mx: 'auto' }}>
            <OrderDetailsContainer orderId={Number(orderId)} />
        </Box>
    );
};
