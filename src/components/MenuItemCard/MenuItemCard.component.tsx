import { useState } from 'react';

import {
    AddRounded,
    DeleteOutlineRounded,
    RemoveRounded,
    StarRounded,
} from '@mui/icons-material';
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

import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import { Image } from '@components';
import { COLORS, FONT_WEIGHT } from '@constant';

import { MenuItemCardProps } from './MenuItemCard.types';

export const MenuItemCard = ({
    title,
    subtitle,
    price,
    rating,
    tag,
    image,
    cartQuantity,
    actionLabel,
    onActionClick,
    onIncrement,
    onDecrement,
    onRemove,
}: MenuItemCardProps) => {
    const [imgSrc, setImgSrc] = useState(image);
    const inStock = tag !== 'Out of Stock';

    const handleImageError = () => {
        setImgSrc(FoodPlaceholder);
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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

                <Typography
                    variant='caption'
                    position='absolute'
                    top={12}
                    left={12}
                    bgcolor={
                        inStock ? COLORS.FEEDBACK.SUCCESS : COLORS.NEUTRAL[800]
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
                    <StarRounded
                        fontSize='inherit'
                        sx={{ color: COLORS.FEEDBACK.WARNING }}
                    />
                    <Typography variant='caption' fontWeight={FONT_WEIGHT.BOLD}>
                        {rating}
                    </Typography>
                </Stack>
            </Box>

            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    p: 2,
                    flexGrow: 1,
                    pb: 2,
                    '&:last-child': { pb: 2 },
                }}
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
                    <Typography variant='body2' noWrap>
                        {subtitle}
                    </Typography>
                </Stack>

                <Typography
                    variant='h6'
                    color='primary.main'
                    fontWeight={FONT_WEIGHT.BOLD}
                >
                    ₹{price}
                </Typography>

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
                                    <RemoveRounded fontSize='small' />
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
                                    <AddRounded fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Stack>

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
                                <DeleteOutlineRounded fontSize='medium' />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ) : (
                    <Button
                        variant={inStock ? 'contained' : 'outlined'}
                        color='primary'
                        disabled={!inStock}
                        onClick={onActionClick}
                        fullWidth
                    >
                        {inStock ? actionLabel : 'Out of Stock'}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
