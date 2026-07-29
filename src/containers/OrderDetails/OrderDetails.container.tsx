import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ReceiptLongRounded } from '@mui/icons-material';
import {
    Box,
    Card,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import { orderApi } from '@api/order.api';
import { FoodPlaceholder } from '@assets/images';
import { BillSummary, EmptyState, ErrorState, ItemListRow } from '@components';
import { OrderItemDetailResponse } from '@type/order.types';
import { formatDateTime } from '@utils';

import { OrderDetailsContainerProps } from './OrderDetails.types';
import { ItemDetailsPopup } from './subComponents';

export const OrderDetailsContainer = ({
    orderId,
}: OrderDetailsContainerProps) => {
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] =
        useState<OrderItemDetailResponse | null>(null);

    const { useGetOrderDetailsQuery } = orderApi;
    const {
        data: order,
        isLoading,
        isError,
        refetch,
    } = useGetOrderDetailsQuery(orderId, {
        skip: !orderId || isNaN(orderId),
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
                minHeight='60vh'
                width='100%'
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
                    <ReceiptLongRounded
                        sx={{ fontSize: 80, color: 'text.disabled' }}
                    />
                }
            />
        );
    }

    const formattedDate = formatDateTime(order.created_at);
    const totalQuantity = order.items.reduce(
        (acc, item) => acc + item.quantity,
        0,
    );
    const totalAmount = parseFloat(order.total_amount);

    return (
        <Box>
            <Box mb={2}>
                <Typography variant='h4'>Order #{order.id}</Typography>
                <Typography variant='body2'>
                    Placed on {formattedDate}
                </Typography>
            </Box>

            <Card sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
                <Typography variant='h5' mb={0.5}>
                    {order.restaurant_name}
                </Typography>
                <Typography variant='body2'>
                    Order successfully placed.
                </Typography>
            </Card>

            <Stack
                direction={{ md: 'row' }}
                gap={4}
                alignItems='flex-start'
                width='100%'
            >
                <Box width={{ xs: '100%', md: '60%' }}>
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

                <Box
                    width={{ xs: '100%', md: '40%' }}
                    sx={{
                        width: { xs: '100%', md: 'calc(40% - 32px)' },
                    }}
                >
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
