import { useNavigate } from 'react-router-dom';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import { Image } from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';

import { ItemDetailsPopupProps } from './ItemDetailsPopup.types';

export const ItemDetailsPopup = ({
    open,
    onClose,
    item,
    restaurantName,
}: ItemDetailsPopupProps) => {
    const navigate = useNavigate();

    if (!item) return null;

    const handleGoToMenu = () => {
        void navigate(ROUTES.MENU);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='xs'
            fullWidth
            slotProps={{ paper: { sx: { borderRadius: 3, p: 2 } } }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h6' fontWeight={FONT_WEIGHT.BOLD}>
                    Item Details
                </Typography>
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{ color: 'text.secondary' }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 3 }}>
                <Stack gap={3}>
                    <Image
                        src={FoodPlaceholder}
                        alt={item.menu_item_name}
                        width='100%'
                        height={200}
                        objectFit='cover'
                        sx={{ borderRadius: 2 }}
                    />

                    <Box>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='flex-start'
                            mb={1}
                        >
                            <Typography
                                variant='h5'
                                fontWeight={FONT_WEIGHT.BOLD}
                                sx={{ pr: 2 }}
                            >
                                {item.menu_item_name}
                            </Typography>

                            {item.menu_item_rating ? (
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    gap={0.5}
                                >
                                    <Typography
                                        variant='body2'
                                        fontWeight={FONT_WEIGHT.BOLD}
                                    >
                                        {item.menu_item_rating}
                                    </Typography>
                                    <StarRoundedIcon sx={{ fontSize: 16 }} />
                                </Stack>
                            ) : null}
                        </Stack>

                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Typography
                                variant='h6'
                                color='primary.main'
                                fontWeight={FONT_WEIGHT.BOLD}
                            >
                                ₹{parseFloat(item.price_at_order).toFixed(2)}
                            </Typography>
                            <Typography
                                variant='body1'
                                fontWeight={FONT_WEIGHT.MEDIUM}
                                color='text.secondary'
                            >
                                Qty: {item.quantity}
                            </Typography>
                        </Stack>
                    </Box>

                    {restaurantName && (
                        <Box
                            p={2}
                            bgcolor='background.default'
                            border={1}
                            borderColor='divider'
                            borderRadius={2}
                        >
                            <Stack
                                direction='row'
                                gap={1.5}
                                alignItems='center'
                            >
                                <StorefrontRoundedIcon color='action' />
                                <Box>
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                        textTransform='uppercase'
                                    >
                                        Sold By
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        fontWeight={FONT_WEIGHT.MEDIUM}
                                    >
                                        {restaurantName}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    size='large'
                    onClick={handleGoToMenu}
                    sx={{
                        borderRadius: 2,
                        fontWeight: FONT_WEIGHT.BOLD,
                        textTransform: 'none',
                    }}
                >
                    Go to Menu
                </Button>
            </DialogActions>
        </Dialog>
    );
};
