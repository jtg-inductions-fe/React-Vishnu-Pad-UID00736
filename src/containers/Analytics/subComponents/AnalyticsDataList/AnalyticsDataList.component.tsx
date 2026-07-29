import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

import { EmptyState } from '@components';

import { AnalyticsDataListProps } from './AnalyticsDataList.types';

export const AnalyticsDataList = <T,>({
    data,
    isLoading,
    emptyMessage,
    renderItem,
}: AnalyticsDataListProps<T>) => {
    if (isLoading) {
        return (
            <Stack gap={2}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} variant='rounded' height={80} />
                ))}
            </Stack>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box py={4}>
                <EmptyState title='No Data Found' description={emptyMessage} />
            </Box>
        );
    }

    return (
        <Stack gap={2}>
            {data.map((item, index) => (
                <Card key={index} variant='outlined'>
                    <CardContent>{renderItem(item, index)}</CardContent>
                </Card>
            ))}
        </Stack>
    );
};
