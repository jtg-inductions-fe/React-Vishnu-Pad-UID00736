import { useState } from 'react';

import toast from 'react-hot-toast';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { useUpdateUserProfileMutation } from '@api/user.api';
import { FONT_WEIGHT } from '@constant';
import { useAppDispatch } from '@store/hooks';
import { updateUser } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';
import { walletUpdateSchema } from '@validations/profile.schema';

export const WalletSection = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();
    const [walletAmount, setWalletAmount] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [updateProfileApi, { isLoading: isUpdating }] =
        useUpdateUserProfileMutation();

    const handleWalletUpdate = async () => {
        const amountNumber = Number(walletAmount);
        const validation = walletUpdateSchema.safeParse({
            amount: amountNumber,
        });

        if (!validation.success) {
            setErrors({ wallet: validation.error.issues[0].message });
            return;
        }

        try {
            const newBalance = Number(user.balance) + amountNumber;
            const updatedUser = await updateProfileApi({
                id: user.id,
                data: { balance: newBalance.toString() },
            }).unwrap();

            dispatch(updateUser(updatedUser));

            toast.success('Wallet top-up successful!');
            setWalletAmount('');
            setErrors({});
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAmount(e.target.value);
        if (errors.wallet) setErrors({});
    };

    const handleTopUpClick = () => {
        void handleWalletUpdate();
    };

    return (
        <Box
            p={4}
            border={1}
            borderColor='divider'
            borderRadius={3}
            bgcolor='background.paper'
        >
            <Typography variant='h6' fontWeight={FONT_WEIGHT.BOLD} mb={4}>
                Digital Wallet
            </Typography>
            <Typography
                variant='h3'
                fontWeight={FONT_WEIGHT.BOLD}
                color='primary.main'
                mb={3}
            >
                ₹{Number(user.balance).toFixed(2)}
            </Typography>

            <Stack spacing={2} mb={1}>
                <TextField
                    fullWidth
                    size='small'
                    placeholder='Add Amount (₹)'
                    type='number'
                    value={walletAmount}
                    onChange={handleAmountChange}
                    error={!!errors.wallet}
                />
                <Button
                    variant='outlined'
                    onClick={handleTopUpClick}
                    disabled={isUpdating || !walletAmount}
                    disableElevation
                >
                    {isUpdating ? 'Processing...' : 'Top-Up'}
                </Button>
            </Stack>
            {errors.wallet && (
                <Typography variant='caption' color='error'>
                    {errors.wallet}
                </Typography>
            )}
        </Box>
    );
};
