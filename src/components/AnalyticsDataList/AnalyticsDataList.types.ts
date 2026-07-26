export interface AnalyticsDataListProps<T> {
    data?: T[];
    isLoading: boolean;
    emptyMessage: string;
    renderItem: (item: T, index: number) => React.ReactNode;
}
