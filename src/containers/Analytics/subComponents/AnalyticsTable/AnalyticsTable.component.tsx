import {
    Box,
    Card,
    CardContent,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';

import { EmptyState } from '@components';
import { FONT_WEIGHT } from '@constant';

import { AnalyticsTableProps } from './AnalyticsTable.types';

export const AnalyticsTable = <T,>({
    title,
    data,
    isLoading,
    emptyMessage,
    renderItem,
}: AnalyticsTableProps<T>) => (
    <Card variant='outlined' sx={{ height: '100%', borderRadius: 2 }}>
        <CardContent>
            <Typography variant='h6' fontWeight={FONT_WEIGHT.BOLD} mb={3}>
                {title}
            </Typography>

            {isLoading ? (
                <Stack gap={2}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} variant='rounded' height={70} />
                    ))}
                </Stack>
            ) : !data || data.length === 0 ? (
                <Box py={4}>
                    <EmptyState title='No Data' description={emptyMessage} />
                </Box>
            ) : (
                <Stack gap={2}>
                    {data.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 1.5,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1.5,
                            }}
                        >
                            {renderItem(item, index)}
                        </Box>
                    ))}
                </Stack>
            )}
        </CardContent>
    </Card>
);
