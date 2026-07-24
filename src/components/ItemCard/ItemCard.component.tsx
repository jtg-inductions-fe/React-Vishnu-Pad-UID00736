import { useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import { Image } from '@components/Image';

import { ItemCardProps } from './ItemCard.types';

const FALLBACK_IMAGE =
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="%23F0EBE3"/%3E%3C/svg%3E';

export const ItemCard = ({
    title,
    subtitle,
    price,
    rating,
    tag,
    image,
    cartQuantity = 0,
    actionLabel,
    onActionClick,
    onIncrement,
    onDecrement,
    onRemove,
}: ItemCardProps) => {
    const [imgSrc, setImgSrc] = useState(image);
    const inStock = tag !== 'Out of Stock';

    return (
        <Card component={Stack} sx={{ height: '100%' }}>
            <Box position='relative' width='100%'>
                <Image
                    src={imgSrc}
                    alt={title}
                    width='100%'
                    objectFit='cover'
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                    sx={{
                        aspectRatio: '4 / 3',
                        filter: inStock
                            ? 'none'
                            : 'grayscale(0.6) brightness(0.85)',
                    }}
                />

                {tag && (
                    <Typography
                        variant='caption'
                        position='absolute'
                        top={12}
                        left={12}
                        bgcolor={inStock ? 'success.main' : 'grey.800'}
                        color='common.white'
                        px={1.25}
                        py={0.5}
                        borderRadius={2}
                        fontWeight='bold'
                        sx={{ backdropFilter: 'blur(4px)' }}
                    >
                        {tag}
                    </Typography>
                )}

                {rating != null && (
                    <Stack
                        direction='row'
                        alignItems='center'
                        gap={0.5}
                        position='absolute'
                        top={12}
                        right={12}
                        bgcolor='rgba(20,20,20,0.72)'
                        color='common.white'
                        px={1.25}
                        py={0.5}
                        borderRadius={5}
                        sx={{ backdropFilter: 'blur(4px)' }}
                    >
                        <StarRoundedIcon
                            fontSize='inherit'
                            sx={{ color: '#FFC53D' }}
                        />
                        <Typography variant='caption' fontWeight='bold'>
                            {rating}
                        </Typography>
                    </Stack>
                )}
            </Box>

            <CardContent
                component={Stack}
                gap={1.5}
                p={2}
                flexGrow={1}
                sx={{ pb: 2, '&:last-child': { pb: 2 } }}
            >
                <Stack gap={0.25}>
                    <Typography
                        variant='subtitle1'
                        fontWeight={700}
                        noWrap
                        title={title}
                    >
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant='body2' noWrap>
                            {subtitle}
                        </Typography>
                    )}
                </Stack>

                {price != null && (
                    <Typography
                        variant='h6'
                        color='primary.main'
                        fontWeight={700}
                    >
                        ₹{price}
                    </Typography>
                )}

                <Box flexGrow={1} />

                {cartQuantity > 0 ? (
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        gap={1}
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
                            border={1}
                            borderColor='primary.main'
                            borderRadius={5}
                            px={0.5}
                            flexGrow={1}
                        >
                            <IconButton
                                size='small'
                                color='primary'
                                onClick={onDecrement}
                            >
                                <RemoveRoundedIcon fontSize='small' />
                            </IconButton>

                            <Typography
                                variant='subtitle2'
                                minWidth={24}
                                align='center'
                                fontWeight={700}
                            >
                                {cartQuantity}
                            </Typography>

                            <IconButton
                                size='small'
                                color='primary'
                                onClick={onIncrement}
                            >
                                <AddRoundedIcon fontSize='small' />
                            </IconButton>
                        </Stack>

                        {onRemove && (
                            <IconButton
                                size='small'
                                color='error'
                                onClick={onRemove}
                            >
                                <DeleteOutlineRoundedIcon fontSize='medium' />
                            </IconButton>
                        )}
                    </Stack>
                ) : (
                    onActionClick &&
                    actionLabel && (
                        <Button
                            variant={inStock ? 'contained' : 'outlined'}
                            color='primary'
                            disabled={!inStock}
                            onClick={onActionClick}
                            fullWidth
                        >
                            {actionLabel}
                        </Button>
                    )
                )}
            </CardContent>
        </Card>
    );
};
