import { useState } from 'react';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';

import { menuManagerApi } from '@api/menuManager.api';
import { ConfirmDialog, EmptyState, ErrorState } from '@components';
import { MenuItemForm } from '@components/MenuItemForm';
import { MenuItem } from '@type';
import { getErrorMessage } from '@utils';
import { MenuItemFormData } from '@validations/menuItem.validation';

export const MenuManagerPage = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const parsedRestaurantId = Number(restaurantId);

    const {
        useGetRestaurantMenuQuery,
        useAddMenuItemMutation,
        useUpdateMenuItemMutation,
        useDeleteMenuItemMutation,
    } = menuManagerApi;

    const {
        data: menuData,
        isLoading,
        error,
        refetch,
    } = useGetRestaurantMenuQuery(parsedRestaurantId);

    const [addMenuItem, { isLoading: isAdding }] = useAddMenuItemMutation();

    const [updateMenuItem, { isLoading: isUpdating }] =
        useUpdateMenuItemMutation();

    const [deleteMenuItem, { isLoading: isDeleting }] =
        useDeleteMenuItemMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const isSubmitting = isAdding || isUpdating;

    const handleRetry = () => {
        void refetch();
    };

    const handleOpenAdd = () => {
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item: MenuItem) => () => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleDeleteClick = (id: number) => () => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (itemToDelete === null) return;

        void (async () => {
            try {
                await deleteMenuItem(itemToDelete).unwrap();
                toast.success('Menu item deleted successfully');
                handleDeleteCancel();
            } catch (err) {
                toast.error(getErrorMessage(err));
            }
        })();
    };

    const handleFormSubmit = (data: MenuItemFormData) => {
        void (async () => {
            try {
                if (selectedItem) {
                    await updateMenuItem({
                        id: selectedItem.id,
                        body: data,
                    }).unwrap();
                    toast.success('Menu item updated successfully');
                } else {
                    await addMenuItem({
                        ...data,
                        restaurant_id: parsedRestaurantId,
                    }).unwrap();
                    toast.success('Menu item added successfully');
                }
                handleCloseModal();
            } catch (err) {
                toast.error(getErrorMessage(err));
            }
        })();
    };

    if (error) {
        return <ErrorState actionLabel='Retry' onActionClick={handleRetry} />;
    }

    const modalInitialData = selectedItem
        ? {
              name: selectedItem.name,
              category: selectedItem.category,
              price: Number(selectedItem.price),
              quantity: selectedItem.quantity,
          }
        : undefined;

    return (
        <Stack gap={7} px={{ xs: 2, md: 4 }} py={4}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={4}
            >
                <Stack gap={1}>
                    <Typography variant='h3'>Menu Manager</Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Add, edit, or remove dishes for this restaurant.
                    </Typography>
                </Stack>

                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AddRoundedIcon />}
                    onClick={handleOpenAdd}
                >
                    Add New Item
                </Button>
            </Stack>

            {isLoading ? (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
                    gap={4}
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} variant='rounded' height={160} />
                    ))}
                </Box>
            ) : menuData?.items.length === 0 ? (
                <EmptyState
                    title='No Items Found'
                    description='Your menu is currently empty. Start by adding your first dish!'
                    actionLabel='Add First Item'
                    onActionClick={handleOpenAdd}
                />
            ) : (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
                    gap={4}
                >
                    {menuData?.items.map((item) => {
                        const inStock = item.quantity > 0;

                        return (
                            <Card
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        flexGrow: 1,
                                        p: 3,
                                    }}
                                >
                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='flex-start'
                                        gap={2}
                                    >
                                        <Stack gap={0.5} flex={1}>
                                            <Typography
                                                variant='subtitle1'
                                                fontWeight={700}
                                                noWrap
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                noWrap
                                            >
                                                {item.category}
                                            </Typography>
                                        </Stack>

                                        <Chip
                                            label={
                                                inStock
                                                    ? 'In Stock'
                                                    : 'Out of Stock'
                                            }
                                            size='small'
                                            color={
                                                inStock ? 'success' : 'default'
                                            }
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    </Stack>

                                    <Typography
                                        variant='h6'
                                        color='primary.main'
                                        fontWeight={700}
                                    >
                                        ₹{item.price}
                                    </Typography>

                                    <Box flexGrow={1} />

                                    <Stack
                                        direction='row'
                                        justifyContent='space-between'
                                        alignItems='center'
                                        pt={1}
                                    >
                                        <Typography variant='caption'>
                                            Qty: {item.quantity}
                                        </Typography>

                                        <Stack direction='row' gap={1}>
                                            <Tooltip
                                                title='Edit'
                                                arrow
                                                placement='top'
                                            >
                                                <IconButton
                                                    size='small'
                                                    color='primary'
                                                    onClick={handleOpenEdit(
                                                        item,
                                                    )}
                                                >
                                                    <EditRoundedIcon fontSize='small' />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip
                                                title='Delete'
                                                arrow
                                                placement='top'
                                            >
                                                <IconButton
                                                    size='small'
                                                    color='error'
                                                    onClick={handleDeleteClick(
                                                        item.id,
                                                    )}
                                                >
                                                    <DeleteOutlineRoundedIcon fontSize='small' />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            )}

            <MenuItemForm
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
                initialData={modalInitialData}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title='Delete Menu Item?'
                description='Are you sure you want to delete this item? This action cannot be undone and it will be permanently removed from your menu.'
                confirmText='Delete'
                loadingText='Deleting...'
                confirmColor='error'
                isLoading={isDeleting}
            />
        </Stack>
    );
};
