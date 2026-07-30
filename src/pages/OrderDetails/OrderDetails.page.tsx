import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { OrderDetailsContainer } from '@containers';

export const OrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <Box>
            <OrderDetailsContainer orderId={Number(orderId)} />
        </Box>
    );
};
