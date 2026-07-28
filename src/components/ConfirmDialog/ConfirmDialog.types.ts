import { ReactNode } from 'react';

import { ButtonProps } from '@mui/material';

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: ReactNode;
    description: ReactNode;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    loadingText?: string;
    confirmColor?: ButtonProps['color'];
}
