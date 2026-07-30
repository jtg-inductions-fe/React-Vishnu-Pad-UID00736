import {
    alpha,
    Card,
    CardContent,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { MetricCardProps } from './MetricCard.types';

export const MetricCard = ({
    title,
    value,
    icon,
    isLoading,
}: MetricCardProps) => (
    <Card variant='outlined' sx={{ height: '100%', borderRadius: 2 }}>
        <CardContent>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='flex-start'
            >
                <Stack gap={1}>
                    <Typography
                        variant='subtitle2'
                        color='text.secondary'
                        fontWeight={FONT_WEIGHT.LIGHT}
                    >
                        {title.toUpperCase()}
                    </Typography>
                    {isLoading ? (
                        <Skeleton variant='text' width={80} height={40} />
                    ) : (
                        <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
                            {value}
                        </Typography>
                    )}
                </Stack>
                {icon && (
                    <Stack
                        alignItems='center'
                        justifyContent='center'
                        sx={{
                            p: 1,
                            borderRadius: 1.5,
                            backgroundColor: (theme) =>
                                alpha(theme.palette.primary.main, 0.12),
                            color: 'primary.main',
                        }}
                    >
                        {icon}
                    </Stack>
                )}
            </Stack>
        </CardContent>
    </Card>
);
