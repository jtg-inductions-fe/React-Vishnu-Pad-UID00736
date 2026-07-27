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
    Tooltip,
    Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import RestaurantPlaceholder from '@assets/images/placeholders/restaurant-placeholder.webp';
import { Image } from '@components';
import { COLORS, FONT_WEIGHT } from '@constant';

import { ItemCardProps } from './ItemCard.types';
const FALLBACK_IMAGE = RestaurantPlaceholder;

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

    const handleImageError = () => {
        setImgSrc(FALLBACK_IMAGE);
    };

    return (
        <Card component={Stack} sx={{ height: '100%' }}>
            <Box position='relative' width='100%'>
                <Image
                    src={imgSrc}
                    alt={title}
                    width='100%'
                    objectFit='cover'
                    onError={handleImageError}
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
                        bgcolor={
                            inStock
                                ? COLORS.FEEDBACK.SUCCESS
                                : COLORS.NEUTRAL[800]
                        }
                        color={COLORS.PRIMARY.CONTRAST}
                        px={1.25}
                        py={0.5}
                        borderRadius={2}
                        fontWeight={FONT_WEIGHT.BOLD}
                        sx={(theme) => ({
                            backdropFilter: `blur(${theme.spacing(0.5)})`,
                        })}
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
                        bgcolor={alpha(COLORS.SECONDARY.DARK, 0.72)}
                        color={COLORS.SECONDARY.CONTRAST}
                        px={1.25}
                        py={0.5}
                        borderRadius={5}
                        sx={(theme) => ({
                            backdropFilter: `blur(${theme.spacing(0.5)})`,
                        })}
                    >
                        <StarRoundedIcon
                            fontSize='inherit'
                            sx={{ color: COLORS.FEEDBACK.WARNING }}
                        />
                        <Typography
                            variant='caption'
                            fontWeight={FONT_WEIGHT.BOLD}
                        >
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
                        fontWeight={FONT_WEIGHT.BOLD}
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
                        fontWeight={FONT_WEIGHT.BOLD}
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
                            <Tooltip
                                title='Decrease quantity'
                                arrow
                                placement='top'
                            >
                                <IconButton
                                    size='small'
                                    color='primary'
                                    onClick={onDecrement}
                                >
                                    <RemoveRoundedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>

                            <Typography
                                variant='subtitle2'
                                minWidth={24}
                                align='center'
                                fontWeight={FONT_WEIGHT.BOLD}
                            >
                                {cartQuantity}
                            </Typography>

                            <Tooltip
                                title='Increase quantity'
                                arrow
                                placement='top'
                            >
                                <IconButton
                                    size='small'
                                    color='primary'
                                    onClick={onIncrement}
                                >
                                    <AddRoundedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        {onRemove && (
                            <Tooltip
                                title='Remove item from cart'
                                arrow
                                placement='top'
                            >
                                <IconButton
                                    size='small'
                                    color='error'
                                    onClick={onRemove}
                                >
                                    <DeleteOutlineRoundedIcon fontSize='medium' />
                                </IconButton>
                            </Tooltip>
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
