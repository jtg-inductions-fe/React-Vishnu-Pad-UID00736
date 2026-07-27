import { Box, Skeleton, Stack } from '@mui/material';

import { ItemSkeletonLoaderProps } from './Skeleton.types';

export const ItemSkeletonLoader = ({
    count = 8,
    minWidth = 280,
    layout = 'row',
}: ItemSkeletonLoaderProps) => {
    const renderSkeletons = () =>
        Array.from({ length: count }).map((_, i) => (
            <Stack
                key={i}
                gap={1}
                minWidth={layout === 'row' ? minWidth : 'auto'}
            >
                <Skeleton
                    variant='rounded'
                    width='100%'
                    height='auto'
                    style={{ borderRadius: 24, aspectRatio: '4 / 3' }}
                />
                <Skeleton variant='text' width='70%' height={28} />
                <Skeleton variant='text' width='40%' height={20} />
            </Stack>
        ));

    if (layout === 'grid') {
        return (
            <Box
                display='grid'
                gridTemplateColumns={`repeat(auto-fill, minmax(${minWidth}px, 1fr))`}
                gap={3}
                width='100%'
            >
                {renderSkeletons()}
            </Box>
        );
    }

    return (
        <Stack direction='row' gap={3} overflow='hidden' width='100%'>
            {renderSkeletons()}
        </Stack>
    );
};
