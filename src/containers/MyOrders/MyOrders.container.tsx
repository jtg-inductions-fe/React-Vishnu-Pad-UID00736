import { useNavigate } from 'react-router-dom';

import { ChevronRightRounded, ReceiptLongRounded } from '@mui/icons-material';
import {
    Box,
    Card,
    CardActionArea,
    Chip,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import { orderApi } from '@api/order.api';
import { EmptyState, ErrorState } from '@components';
import { ROUTES } from '@constant';
import { formatDateTime } from '@utils/common.utils';

export const MyOrdersContainer = () => {
    const navigate = useNavigate();
    const { useGetAllOrdersQuery } = orderApi;

    const {
        data: orders,
        isLoading,
        isError,
        refetch,
    } = useGetAllOrdersQuery();

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

    if (!orders || orders.length === 0) {
        return (
            <EmptyState
                title='No Orders Yet'
                description="Looks like you haven't placed any orders yet. Discover great food around you!"
                actionLabel='Browse Restaurants'
                onActionClick={handleBrowseRestaurants}
                icon={
                    <ReceiptLongRounded
                        sx={{ fontSize: 80, color: 'text.disabled' }}
                    />
                }
            />
        );
    }

    return (
        <Stack>
            {orders.map((order) => {
                const formattedDate = formatDateTime(order.created_at);
                const itemLabel =
                    order.total_items === 1
                        ? '1 Item'
                        : `${order.total_items} Items`;

                return (
                    <Card
                        key={order.id}
                        sx={{
                            mb: 2.5,
                            transition: 'border-color 0.2s ease-in-out',
                            '&:hover': {
                                borderColor: 'primary.main',
                            },
                        }}
                    >
                        <CardActionArea
                            onClick={handleOrderClick(order.id)}
                            sx={{ p: 2.5 }}
                        >
                            <Stack
                                direction='row'
                                gap={2}
                                alignItems='flex-start'
                                mb={2}
                            >
                                <Box
                                    sx={{
                                        p: 1.2,
                                        borderRadius: 2,
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        display: 'flex',
                                    }}
                                >
                                    <ReceiptLongRounded
                                        fontSize='small'
                                        color='action'
                                    />
                                </Box>

                                <Stack flex={1} gap={0.2}>
                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                    >
                                        <Typography variant='subtitle1' noWrap>
                                            {order.restaurant_name}
                                        </Typography>
                                        <Typography variant='subtitle1'>
                                            ₹{order.total_amount}
                                        </Typography>
                                    </Stack>

                                    <Typography variant='caption'>
                                        {formattedDate}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Divider sx={{ borderStyle: 'dashed', my: 1.5 }} />

                            <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Typography
                                    variant='body2'
                                    noWrap
                                    sx={{ maxWidth: '70%' }}
                                >
                                    {order.items_summary}
                                </Typography>

                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    gap={0.5}
                                >
                                    <Chip label={itemLabel} size='small' />
                                    <ChevronRightRounded
                                        fontSize='small'
                                        color='action'
                                    />
                                </Stack>
                            </Stack>
                        </CardActionArea>
                    </Card>
                );
            })}
        </Stack>
    );
};
