import { ReactNode } from 'react';

export interface MetricCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    isLoading?: boolean;
}
