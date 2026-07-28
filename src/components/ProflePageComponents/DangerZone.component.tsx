import { useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { userApi } from '@api/user.api';
import { ConfirmDialog } from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';
import { useAppDispatch } from '@store/hooks';
import { logout } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';

export const DangerZone = ({ user }: { user: User }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { useDeleteUserProfileMutation } = userApi;

    const [deleteProfile, { isLoading: isDeleting }] =
        useDeleteUserProfileMutation();

    const handleDeleteAccount = async () => {
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

    return (
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
                <Typography variant='body2' color='text.secondary' mb={3}>
                    This action is permanent. All your data, order history, and
                    wallet balance will be lost.
                </Typography>

                <Box display='flex' justifyContent='flex-end'>
                    <Button
                        variant='contained'
                        color='error'
                        disableElevation
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>

            <ConfirmDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={() => {
                    void handleDeleteAccount();
                }}
                title='Account Delete Confirmation'
                description='Are you absolutely certain you want to permanently erase your account? This action cannot be undone and will immediately terminate your session.'
                confirmText='Confirm Deletion'
                loadingText='Erasing...'
                confirmColor='error'
                isLoading={isDeleting}
            />
        </>
    );
};
