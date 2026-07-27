import { useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';

import { FONT_WEIGHT } from '@constant';
import { useUserService } from '@services';
import { useAppDispatch } from '@store/hooks';
import { logout } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';

export const DangerZone = ({ user }: { user: User }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { deleteProfile, isDeleting } = useUserService();

    const handleDeleteAccount = async () => {
        try {
            await deleteProfile(user.id);
            dispatch(logout());

            toast.success('Account permanently deleted.');
            setIsDeleteDialogOpen(false);
            void navigate('/');
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
                    Danger Zone
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

            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
            >
                <DialogTitle fontWeight={700}>
                    Account Delete Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you absolutely certain you want to permanently erase
                        your account? This action cannot be undone and will
                        immediately terminate your session.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsDeleteDialogOpen(false)}
                        color='inherit'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            void handleDeleteAccount();
                        }}
                        color='error'
                        variant='contained'
                        disabled={isDeleting}
                        disableElevation
                    >
                        {isDeleting ? 'Erasing...' : 'Confirm Deletion'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
