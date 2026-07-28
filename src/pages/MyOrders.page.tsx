import { useNavigate } from 'react-router-dom';

import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

import { orderApi } from '@api/order.api';
import { EmptyState, ErrorState, OrderCard } from '@components';
import { ROUTES } from '@constant';

export const MyOrdersPage = () => {
    const { useGetAllOrdersQuery } = orderApi;

    const {
        data: orders,
        isLoading,
        isError,
        refetch,
    } = useGetAllOrdersQuery();

    const navigate = useNavigate();

    const handleRefetch = () => {
        void refetch();
    };

    const handleBrowseRestaurants = () => {
        void navigate(ROUTES.RESTAURANTS);
    };

    const handleOrderClick = (orderId: number) => () => {
        void navigate(`${ROUTES.MY_ORDERS}/${orderId}`);
    };

    if (isError) {
        return (
            <ErrorState
                title='Could not load orders'
                description='We encountered an issue while fetching your order history. Please try again.'
                actionLabel='Try Again'
                onActionClick={handleRefetch}
            />
        );
    }

    return (
        <Box sx={{ py: 4 }}>
            <Typography variant='h5' mb={3}>
                My Orders
            </Typography>

            {isLoading ? (
                <Box display='flex' justifyContent='center' py={8}>
                    <CircularProgress />
                </Box>
            ) : orders?.length === 0 ? (
                <EmptyState
                    title='No Orders Yet'
                    description="Looks like you haven't placed any orders yet. Discover great food around you!"
                    actionLabel='Browse Restaurants'
                    onActionClick={handleBrowseRestaurants}
                    icon={
                        <ReceiptLongRoundedIcon
                            sx={{ fontSize: 80, color: 'text.disabled' }}
                        />
                    }
                />
            ) : (
                <Stack>
                    {orders?.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onClick={handleOrderClick(order.id)}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
};
