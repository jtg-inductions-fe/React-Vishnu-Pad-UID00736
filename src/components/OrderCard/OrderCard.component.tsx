import { ChevronRightRounded, ReceiptLongRounded } from '@mui/icons-material';
import {
    Box,
    Card,
    CardActionArea,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

import { formatDateTime } from '@utils';

import { OrderCardProps } from './OrderCard.types';

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
    const formattedDate = formatDateTime(order.created_at);

    const itemLabel =
        order.total_items === 1 ? '1 Item' : `${order.total_items} Items`;

    return (
        <Card
            sx={{
                mb: 2.5,
                transition: 'border-color 0.2s ease-in-out',
                '&:hover': {
                    borderColor: 'primary.main',
                },
            }}
        >
            <CardActionArea onClick={onClick} sx={{ p: 2.5 }}>
                <Stack direction='row' gap={2} alignItems='flex-start' mb={2}>
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
                        <ReceiptLongRounded fontSize='small' color='action' />
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
                    <Typography variant='body2' noWrap sx={{ maxWidth: '70%' }}>
                        {order.items_summary}
                    </Typography>

                    <Stack direction='row' alignItems='center' gap={0.5}>
                        <Chip label={itemLabel} size='small' />
                        <ChevronRightRounded fontSize='small' color='action' />
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
};
