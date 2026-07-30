import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { BillSummaryProps } from './BillSummary.types';

export const BillSummary = ({
    totalAmount,
    totalQuantity,
    userBalance,
    isLoggedIn = false,
    isActionDisabled,
    actionLabel = 'Place Order',
    onActionClick,
    isLoading,
    errorMessage,
}: BillSummaryProps) => {
    const safeUserBalance = Number.isNaN(Number(userBalance))
        ? 0
        : Number(userBalance);
    const remainingBalance = safeUserBalance - totalAmount;
    const isInsufficientBalance = remainingBalance < 0;

    const buttonText = !isLoggedIn
        ? 'Login to Place Order'
        : isLoading
          ? 'Processing...'
          : actionLabel;

    const isButtonDisabled = isLoggedIn
        ? isActionDisabled || isInsufficientBalance || isLoading
        : false;

    return (
        <Box
            p={3}
            border={1}
            borderColor='divider'
            borderRadius={2}
            bgcolor='background.paper'
        >
            <Typography variant='h6' mb={3}>
                Bill Summary
            </Typography>

            <Stack gap={1.5} mb={3}>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='body1' color='text.secondary'>
                        Total Items
                    </Typography>
                    <Typography variant='body1' fontWeight={FONT_WEIGHT.MEDIUM}>
                        {totalQuantity}
                    </Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='body1' color='text.secondary'>
                        Item Total
                    </Typography>
                    <Typography variant='body1' fontWeight={FONT_WEIGHT.MEDIUM}>
                        ₹{totalAmount.toFixed(2)}
                    </Typography>
                </Stack>
                <Divider />
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6'>Grand Total</Typography>
                    <Typography variant='h6'>
                        ₹{totalAmount.toFixed(2)}
                    </Typography>
                </Stack>
            </Stack>

            {isLoggedIn &&
                userBalance !== undefined &&
                !Number.isNaN(Number(userBalance)) && (
                    <Stack
                        gap={1.5}
                        mb={3}
                        p={2}
                        borderRadius={1.5}
                        bgcolor='action.hover'
                    >
                        <Typography
                            variant='subtitle2'
                            color='text.secondary'
                            textTransform='uppercase'
                        >
                            Wallet Balance
                        </Typography>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='body2'>
                                Current Balance:
                            </Typography>
                            <Typography
                                variant='body2'
                                fontWeight={FONT_WEIGHT.MEDIUM}
                            >
                                ₹{safeUserBalance.toFixed(2)}
                            </Typography>
                        </Stack>
                    </Stack>
                )}

            {errorMessage && (
                <Typography
                    variant='body2'
                    color='error.main'
                    mb={2}
                    textAlign='center'
                >
                    {errorMessage}
                </Typography>
            )}

            {onActionClick && (
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    size='large'
                    disabled={isButtonDisabled}
                    onClick={onActionClick}
                    disableElevation
                >
                    {buttonText}
                </Button>
            )}
        </Box>
    );
};
