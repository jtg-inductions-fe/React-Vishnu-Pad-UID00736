import { useState } from 'react';

import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';

import RestaurantPlaceholder from '@assets/images/placeholders/restaurant-placeholder.webp';
import { Image } from '@components';
import { FONT_WEIGHT } from '@constant';

import { RestaurantCardProps } from './RestaurantCard.types';

export const RestaurantCard = ({
    title,
    subtitle,
    image,
    actionLabel,
    onActionClick,
}: RestaurantCardProps) => {
    const [imgSrc, setImgSrc] = useState(image);

    const handleImageError = () => {
        setImgSrc(RestaurantPlaceholder);
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
                    sx={{ aspectRatio: '4 / 3' }}
                />
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
                    <Typography variant='body2' noWrap>
                        {subtitle}
                    </Typography>
                </Stack>

                <Box flexGrow={1} />

                <Button
                    variant='contained'
                    color='primary'
                    onClick={onActionClick}
                    fullWidth
                >
                    {actionLabel}
                </Button>
            </CardContent>
        </Card>
    );
};
