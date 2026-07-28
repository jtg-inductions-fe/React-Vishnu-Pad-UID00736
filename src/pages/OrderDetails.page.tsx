import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import {
    Box,
    Card,
    CircularProgress,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import {
    BillSummary,
    EmptyState,
    ErrorState,
    ItemDetailsPopup,
    ItemListRow,
} from '@components';
import { useOrderService } from '@services';
import { OrderItemDetailResponse } from '@type/order.types';

export const OrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] =
        useState<OrderItemDetailResponse | null>(null);

    const { useGetOrderDetailsQuery } = useOrderService();

    const {
        data: order,
        isLoading,
        isError,
        refetch,
    } = useGetOrderDetailsQuery(Number(orderId), {
        skip: !orderId,
    });

    const handleRefetch = () => {
        void refetch();
    };

    const handleGoBack = () => {
        void navigate(-1);
    };

    const handleItemClick = (item: OrderItemDetailResponse) => () => {
        setSelectedItem(item);
    };

    const handleClosePopup = () => {
        setSelectedItem(null);
    };

    if (isError) {
        return (
            <ErrorState
                title='Could not load order details'
                description='We encountered an issue while fetching this order. Please try again.'
                actionLabel='Try Again'
                onActionClick={handleRefetch}
            />
        );
    }

    if (isLoading) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!order) {
        return (
            <EmptyState
                title='Order Not Found'
                description="We couldn't find the details for this order. It may have been removed."
                actionLabel='Back to Orders'
                onActionClick={handleGoBack}
                icon={
                    <ReceiptLongRoundedIcon
                        sx={{ fontSize: 80, color: 'text.disabled' }}
                    />
                }
            />
        );
    }

    const totalQuantity = order.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
    );
    const totalAmount = parseFloat(order.total_amount);

    const formattedDate = new Date(order.created_at).toLocaleDateString(
        'en-IN',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        },
    );

    return (
        <Box sx={{ py: 4, mx: 'auto' }}>
            <Stack direction='row' alignItems='center' gap={2} mb={4}>
                <IconButton onClick={handleGoBack} color='inherit'>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <Box>
                    <Typography variant='h4'>Order #{order.id}</Typography>
                    <Typography variant='body2'>
                        Placed on {formattedDate}
                    </Typography>
                </Box>
            </Stack>

            <Card sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
                <Typography variant='h5' mb={0.5}>
                    {order.restaurant_name}
                </Typography>
                <Typography variant='body2'>
                    Order successfully placed.
                </Typography>
            </Card>

            <Stack direction={{ md: 'row' }} gap={4} alignItems='flex-start'>
                <Box flex={1} width='100%'>
                    <Typography variant='h6' mb={2}>
                        Items Ordered
                    </Typography>
                    <Stack divider={<Divider flexItem />}>
                        {order.items.map((item) => (
                            <ItemListRow
                                key={item.id}
                                id={item.id}
                                name={item.menu_item_name}
                                price={parseFloat(item.price_at_order)}
                                quantity={item.quantity}
                                image={FoodPlaceholder}
                                onClick={handleItemClick(item)}
                            />
                        ))}
                    </Stack>
                </Box>

                <Box width={{ xs: '100%', md: 350 }}>
                    <BillSummary
                        totalAmount={totalAmount}
                        totalQuantity={totalQuantity}
                        isLoggedIn={false}
                    />
                </Box>
            </Stack>

            <ItemDetailsPopup
                open={!!selectedItem}
                onClose={handleClosePopup}
                item={selectedItem}
                restaurantName={order.restaurant_name}
            />
        </Box>
    );
};
