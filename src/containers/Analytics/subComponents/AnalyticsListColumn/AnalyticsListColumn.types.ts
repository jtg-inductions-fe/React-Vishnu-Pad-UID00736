import { ReactNode } from 'react';

export interface AnalyticsListColumnProps<T> {
    title: string;
    data?: T[];
    isLoading?: boolean;
    emptyMessage: string;
    renderItem: (item: T, index: number) => ReactNode;
}
