import { FormEvent, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Grid2,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { userApi } from '@api/user.api';
import { ConfirmDialog } from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout, updateUser } from '@store/slices';
import { getErrorMessage } from '@utils';
import {
    ProfileFormData,
    WALLET_VALIDATION_RULES,
    WalletFormData,
} from '@validations/profile.validation';

import { ProfileDetails } from './subComponents';

export const ProfileContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { useUpdateUserProfileMutation, useDeleteUserProfileMutation } =
        userApi;

    const [updateProfile, { isLoading: isUpdatingProfile }] =
        useUpdateUserProfileMutation();
    const [deleteProfile, { isLoading: isDeletingAccount }] =
        useDeleteUserProfileMutation();

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        reset: resetProfile,
        formState: { errors: profileErrors },
    } = useForm<ProfileFormData>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            city: user?.city || '',
            state: user?.state || '',
            zipcode: user?.zipcode || '',
        },
    });

    useEffect(() => {
        if (user) {
            resetProfile({
                name: user.name || '',
                email: user.email || '',
                city: user.city || '',
                state: user.state || '',
                zipcode: user.zipcode || '',
            });
        }
    }, [user, resetProfile, isEditingProfile]);

    const handleEnableEdit = () => setIsEditingProfile(true);

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        resetProfile();
    };

    const onSubmitProfile = async (data: ProfileFormData) => {
        if (!user) return;
        try {
            const updatedUser = await updateProfile({
                id: user.id,
                data,
            }).unwrap();

            dispatch(updateUser(updatedUser));
            toast.success('Profile details updated successfully!');
            setIsEditingProfile(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleProfileFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        void handleSubmitProfile(onSubmitProfile)(e);
    };

    const {
        register: registerWallet,
        handleSubmit: handleSubmitWallet,
        reset: resetWallet,
        formState: { errors: walletErrors },
    } = useForm<WalletFormData>();

    const onSubmitWallet = async (data: WalletFormData) => {
        if (!user) return;
        const amountNumber = Number(data.amount);
        try {
            const newBalance = Number(user.balance) + amountNumber;
            const updatedUser = await updateProfile({
                id: user.id,
                data: { balance: newBalance.toString() },
            }).unwrap();

            dispatch(updateUser(updatedUser));
            toast.success('Wallet top-up successful!');
            resetWallet();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleWalletFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        void handleSubmitWallet(onSubmitWallet)(e);
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        try {
            await deleteProfile(user.id).unwrap();
            dispatch(logout());

            toast.success('Account permanently deleted.');
            setIsDeleteDialogOpen(false);
            void navigate(ROUTES.HOME);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleOpenDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleConfirmDeleteAccount = () => {
        void handleDeleteAccount();
    };

    if (!user) return null;

    return (
        <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 8 }}>
                <Stack spacing={4}>
                    <ProfileDetails
                        user={user}
                        isEditing={isEditingProfile}
                        isUpdating={isUpdatingProfile}
                        register={registerProfile}
                        errors={profileErrors}
                        onEnableEdit={handleEnableEdit}
                        onCancelEdit={handleCancelEdit}
                        onSubmitForm={handleProfileFormSubmit}
                    />

                    <>
                        <Box
                            p={4}
                            border={1}
                            borderColor='error.main'
                            borderRadius={3}
                            bgcolor='background.paper'
                        >
                            <Typography
                                variant='h6'
                                fontWeight={FONT_WEIGHT.BOLD}
                                color='error.main'
                                mb={1}
                            >
                                Delete Account
                            </Typography>
                            <Typography
                                variant='body2'
                                color='text.secondary'
                                mb={3}
                            >
                                This action is permanent. All your data, order
                                history, and wallet balance will be lost.
                            </Typography>

                            <Box display='flex' justifyContent='flex-end'>
                                <Button
                                    variant='contained'
                                    color='error'
                                    disableElevation
                                    onClick={handleOpenDeleteDialog}
                                >
                                    Delete Account
                                </Button>
                            </Box>
                        </Box>

                        <ConfirmDialog
                            open={isDeleteDialogOpen}
                            onClose={handleCloseDeleteDialog}
                            onConfirm={handleConfirmDeleteAccount}
                            title='Account Delete Confirmation'
                            description='Are you absolutely certain you want to permanently erase your account? This action cannot be undone and will immediately terminate your session.'
                            confirmText='Confirm Deletion'
                            loadingText='Erasing...'
                            confirmColor='error'
                            isLoading={isDeletingAccount}
                        />
                    </>
                </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
                <Box
                    p={4}
                    border={1}
                    borderColor='divider'
                    borderRadius={3}
                    bgcolor='background.paper'
                >
                    <Typography
                        variant='h6'
                        fontWeight={FONT_WEIGHT.BOLD}
                        mb={4}
                    >
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

                    <Stack
                        component='form'
                        onSubmit={handleWalletFormSubmit}
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            size='small'
                            placeholder='Add Amount (₹)'
                            type='number'
                            {...registerWallet(
                                'amount',
                                WALLET_VALIDATION_RULES,
                            )}
                            error={!!walletErrors.amount}
                            helperText={walletErrors.amount?.message}
                        />
                        <Button
                            type='submit'
                            variant='outlined'
                            disabled={isUpdatingProfile}
                            disableElevation
                        >
                            {isUpdatingProfile ? 'Processing...' : 'Top-Up'}
                        </Button>
                    </Stack>
                </Box>
            </Grid2>
        </Grid2>
    );
};
