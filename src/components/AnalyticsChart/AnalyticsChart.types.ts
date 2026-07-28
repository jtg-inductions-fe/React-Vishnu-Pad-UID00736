export type ChartTab = 'customers' | 'menu' | 'orders';

export interface ChartDataPoint {
    label: string;
    value: number;
}

export interface AnalyticsChartProps {
    activeTab: ChartTab;
    onTabChange: (
        event: React.MouseEvent<HTMLElement>,
        newTab: ChartTab | null,
    ) => void;
    data: ChartDataPoint[];
    isLoading?: boolean;
}
