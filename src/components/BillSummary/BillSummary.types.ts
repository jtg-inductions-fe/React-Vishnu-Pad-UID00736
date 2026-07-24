export interface BillSummaryProps {
    totalAmount: number;
    totalQuantity: number;
    userBalance?: number;
    isLoggedIn?: boolean;
    isActionDisabled?: boolean;
    actionLabel?: string;
    onActionClick?: () => void;
    isLoading?: boolean;
    errorMessage?: string | null;
}
