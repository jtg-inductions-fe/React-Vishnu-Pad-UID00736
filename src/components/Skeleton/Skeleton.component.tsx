import { Skeleton, Stack } from '@mui/material';
import { Grid2 } from '@mui/material';

import { ItemSkeletonLoaderProps } from './Skeleton.types';

export const ItemSkeletonLoader = ({
    count = 8,
    layout = 'row',
}: ItemSkeletonLoaderProps) => {
    const renderSkeleton = () => (
        <Stack gap={1}>
            <Skeleton
                variant='rounded'
                width='100%'
                height='auto'
                sx={{
                    borderRadius: 3,
                    aspectRatio: '4 / 3',
                }}
            />
            <Skeleton variant='text' width='70%' height={28} />
            <Skeleton variant='text' width='40%' height={20} />
        </Stack>
    );

    if (layout === 'grid') {
        return (
            <Grid2 container spacing={3}>
                {Array.from({ length: count }).map((_, index) => (
                    <Grid2
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 3,
                        }}
                    >
                        {renderSkeleton()}
                    </Grid2>
                ))}
            </Grid2>
        );
    }

    return (
        <Stack direction='row' gap={3} overflow='hidden' width='100%'>
            {Array.from({ length: count }).map((_, index) => (
                <Grid2 key={index} size='auto' sx={{ minWidth: 280 }}>
                    {renderSkeleton()}
                </Grid2>
            ))}
        </Stack>
    );
};
