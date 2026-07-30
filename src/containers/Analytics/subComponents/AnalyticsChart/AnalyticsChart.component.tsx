import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

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

import { EmptyState } from '@components';

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
                    direction={{ md: 'row' }}
                    justifyContent='space-between'
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    gap={2}
                    mb={4}
                >
                    <Typography variant='h6'>Performance Overview</Typography>
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
                        <ResponsiveContainer width='100%' height='100%'>
                            <BarChart
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray='3 3'
                                    vertical={false}
                                    stroke={theme.palette.divider}
                                />
                                <XAxis
                                    dataKey='label'
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: theme.palette.text.secondary,
                                        fontSize: 12,
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: theme.palette.text.secondary,
                                        fontSize: 12,
                                    }}
                                />
                                <Tooltip
                                    cursor={{
                                        fill: theme.palette.action.hover,
                                    }}
                                    contentStyle={{
                                        backgroundColor:
                                            theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar
                                    dataKey='value'
                                    fill={theme.palette.primary.main}
                                    barSize={50}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
