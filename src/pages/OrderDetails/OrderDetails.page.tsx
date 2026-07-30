import { useParams } from 'react-router-dom';

import { OrderDetailsContainer } from '@containers';

export const OrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return <OrderDetailsContainer orderId={Number(orderId)} />;
};
