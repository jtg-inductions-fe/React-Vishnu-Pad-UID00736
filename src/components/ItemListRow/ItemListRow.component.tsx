import {
    AddRounded,
    DeleteOutlineRounded,
    RemoveRounded,
} from '@mui/icons-material';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { Image } from '@components';
import { FONT_WEIGHT } from '@constant';

import { ItemListRowProps } from './ItemListRow.types';

export const ItemListRow = ({
    name,
    price,
    image,
    quantity,
    onIncrement,
    onDecrement,
    onRemove,
    onClick,
}: ItemListRowProps) => {
    const isEditable = !!(onIncrement || onDecrement || onRemove);
    const formattedPrice = price.toFixed(2);
    const totalPrice = (price * quantity).toFixed(2);

    return (
        <Stack
            direction={{ sm: 'row' }}
            gap={2}
            py={2}
            alignItems='center'
            width='100%'
            onClick={onClick}
            sx={{
                cursor: onClick ? 'pointer' : 'default',
                transition: 'background-color 0.2s ease',
                px: onClick ? 1 : 0,
                borderRadius: 1.5,
                '&:hover': {
                    bgcolor: onClick ? 'action.hover' : 'transparent',
                },
            }}
        >
            <Image
                src={image}
                alt={name}
                width={80}
                height={80}
                objectFit='cover'
                sx={{ borderRadius: 1.5 }}
            />

            <Stack flex={1} gap={0.5} width='100%'>
                <Typography
                    variant='subtitle1'
                    fontWeight={FONT_WEIGHT.MEDIUM}
                    noWrap
                >
                    {name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    ₹{formattedPrice}
                </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' gap={2}>
                <Typography variant='subtitle1' fontWeight={FONT_WEIGHT.BOLD}>
                    ₹{totalPrice}
                </Typography>

                {isEditable ? (
                    <Stack direction='row' alignItems='center' gap={1}>
                        <Tooltip
                            title='Decrease quantity'
                            arrow
                            placement='top'
                        >
                            <IconButton
                                size='small'
                                onClick={onDecrement}
                                color='primary'
                                sx={{ bgcolor: 'action.hover' }}
                            >
                                <RemoveRounded fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        <Typography
                            variant='body1'
                            fontWeight={FONT_WEIGHT.MEDIUM}
                            width={24}
                            textAlign='center'
                        >
                            {quantity}
                        </Typography>

                        <Tooltip
                            title='Increase quantity'
                            arrow
                            placement='top'
                        >
                            <IconButton
                                size='small'
                                onClick={onIncrement}
                                color='primary'
                                sx={{ bgcolor: 'action.hover' }}
                            >
                                <AddRounded fontSize='small' />
                            </IconButton>
                        </Tooltip>

                        {onRemove && (
                            <Tooltip title='Remove item' arrow placement='top'>
                                <IconButton
                                    size='small'
                                    color='error'
                                    onClick={onRemove}
                                    sx={{ ml: 1 }}
                                >
                                    <DeleteOutlineRounded fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                ) : (
                    <Typography
                        variant='body1'
                        fontWeight={FONT_WEIGHT.MEDIUM}
                        color='text.secondary'
                        width={60}
                        textAlign='right'
                    >
                        Qty: {quantity}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
};
