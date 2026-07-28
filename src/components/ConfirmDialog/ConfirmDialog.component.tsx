import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { ConfirmDialogProps } from './ConfirmDialog.types';

export const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
    loadingText = 'Processing...',
    confirmColor = 'primary',
}: ConfirmDialogProps) => (
    <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
            paper: {
                sx: { borderRadius: 3, padding: 1 },
            },
        }}
    >
        <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
            <Button
                onClick={onClose}
                color='inherit'
                disabled={isLoading}
                sx={{ fontWeight: 600 }}
            >
                {cancelText}
            </Button>
            <Button
                onClick={onConfirm}
                color={confirmColor}
                variant='contained'
                disabled={isLoading}
                disableElevation
                sx={{ fontWeight: 600 }}
            >
                {isLoading ? loadingText : confirmText}
            </Button>
        </DialogActions>
    </Dialog>
);
