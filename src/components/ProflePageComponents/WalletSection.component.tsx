import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { useUserService } from '@services';
import { useAppDispatch } from '@store/hooks';
import { updateUser } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';
import {
    WALLET_VALIDATION_RULES,
    WalletFormData,
} from '@validations/profile.validation';

export const WalletSection = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();
    const { updateProfile, isUpdating } = useUserService();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<WalletFormData>();

    const handleFormSubmit = (e: React.FormEvent) => {
        void handleSubmit(onSubmit)(e);
    };

    const onSubmit = async (data: WalletFormData) => {
        const amountNumber = Number(data.amount);
        try {
            const newBalance = Number(user.balance) + amountNumber;
            const updatedUser = await updateProfile(user.id, {
                balance: newBalance.toString(),
            });

            dispatch(updateUser(updatedUser));

            toast.success('Wallet top-up successful!');
            reset();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
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

            <Stack component='form' onSubmit={handleFormSubmit} spacing={2}>
                <TextField
                    fullWidth
                    size='small'
                    placeholder='Add Amount (₹)'
                    type='number'
                    {...register('amount', WALLET_VALIDATION_RULES)}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                />
                <Button
                    type='submit'
                    variant='outlined'
                    disabled={isUpdating}
                    disableElevation
                >
                    {isUpdating ? 'Processing...' : 'Top-Up'}
                </Button>
            </Stack>
        </Box>
    );
};
