import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Stack, Typography } from '@mui/material';

import { Image } from '@components/Image';

import { ItemListRowProps } from './ItemListRow.types';

export const ItemListRow = ({
    name,
    price,
    image,
    quantity,
    onIncrement,
    onDecrement,
    onRemove,
}: ItemListRowProps) => {
    const isEditable = !!(onIncrement || onDecrement || onRemove);

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={2}
            py={2}
            alignItems='center'
            width='100%'
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
                <Typography variant='subtitle1' fontWeight={600} noWrap>
                    {name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    ₹{price.toFixed(2)}
                </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' gap={2}>
                <Typography variant='subtitle1' fontWeight={700}>
                    ₹{(price * quantity).toFixed(2)}
                </Typography>

                {isEditable ? (
                    <Stack direction='row' alignItems='center' gap={1}>
                        <IconButton
                            size='small'
                            onClick={onDecrement}
                            color='primary'
                            sx={{ bgcolor: 'action.hover' }}
                        >
                            <RemoveRoundedIcon fontSize='small' />
                        </IconButton>

                        <Typography
                            variant='body1'
                            fontWeight={600}
                            width={24}
                            textAlign='center'
                        >
                            {quantity}
                        </Typography>

                        <IconButton
                            size='small'
                            onClick={onIncrement}
                            color='primary'
                            sx={{ bgcolor: 'action.hover' }}
                        >
                            <AddRoundedIcon fontSize='small' />
                        </IconButton>

                        {onRemove && (
                            <IconButton
                                size='small'
                                color='error'
                                onClick={onRemove}
                                sx={{ ml: 1 }}
                            >
                                <DeleteOutlineRoundedIcon fontSize='small' />
                            </IconButton>
                        )}
                    </Stack>
                ) : (
                    <Typography
                        variant='body1'
                        fontWeight={600}
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
