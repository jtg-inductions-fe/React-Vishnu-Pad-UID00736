import { ReactNode } from 'react';

export interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
    icon?: ReactNode;
}
