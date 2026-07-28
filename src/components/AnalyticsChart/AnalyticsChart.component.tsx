import {
    Box,
    Card,
    CardContent,
    Skeleton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import { EmptyState } from '@components';
import { FONT_WEIGHT } from '@constant';

import { AnalyticsChartProps } from './AnalyticsChart.types';

export const AnalyticsChart = ({
    activeTab,
    onTabChange,
    data,
    isLoading,
}: AnalyticsChartProps) => {
    const theme = useTheme();

    return (
        <Card variant='outlined' sx={{ borderRadius: 2 }}>
            <CardContent>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent='space-between'
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    gap={2}
                    mb={4}
                >
                    <Typography variant='h6' fontWeight={FONT_WEIGHT.BOLD}>
                        Performance Overview
                    </Typography>
                    <ToggleButtonGroup
                        color='primary'
                        value={activeTab}
                        exclusive
                        onChange={onTabChange}
                        size='small'
                        aria-label='Chart Tabs'
                    >
                        <ToggleButton value='customers'>
                            Top Customers
                        </ToggleButton>
                        <ToggleButton value='menu'>Top Menu Items</ToggleButton>
                        <ToggleButton value='orders'>
                            Recent Orders
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                {isLoading ? (
                    <Skeleton variant='rounded' height={350} width='100%' />
                ) : data.length === 0 ? (
                    <Box
                        height={350}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <EmptyState
                            title='No Data'
                            description='Not enough data to display chart.'
                        />
                    </Box>
                ) : (
                    <Box height={350} width='100%'>
                        <BarChart
                            dataset={data}
                            xAxis={[
                                {
                                    scaleType: 'band',
                                    dataKey: 'label',
                                },
                            ]}
                            series={[
                                {
                                    dataKey: 'value',
                                    color: theme.palette.primary.main,
                                },
                            ]}
                            grid={{ horizontal: true }}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 40,
                                bottom: 25,
                            }}
                            sx={{
                                '& .MuiChartsAxis-line': {
                                    stroke: 'transparent',
                                },
                                '& .MuiChartsAxis-tick': {
                                    stroke: 'transparent',
                                },

                                '& .MuiChartsAxis-tickLabel': {
                                    fill: theme.palette.text.secondary,
                                    fontSize: 12,
                                },

                                '& .MuiChartsGrid-line': {
                                    strokeDasharray: '3 3',
                                    stroke: theme.palette.divider,
                                },
                            }}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
