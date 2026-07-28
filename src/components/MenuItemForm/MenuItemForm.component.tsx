import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';

import {
    MENU_ITEM_VALIDATION_RULES,
    MenuItemFormData,
} from '@validations/menuItem.validation';

import { MenuItemFormProps } from './MenuItemForm.types';

export const MenuItemForm = ({
    open,
    onClose,
    onSubmit,
    initialData,
    isLoading,
}: MenuItemFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MenuItemFormData>({
        defaultValues: {
            name: '',
            category: '',
            price: undefined,
            quantity: undefined,
        },
    });

    useEffect(() => {
        if (open) {
            reset(
                initialData || {
                    name: '',
                    category: '',
                    price: undefined,
                    quantity: undefined,
                },
            );
        }
    }, [open, initialData, reset]);

    const handleFormSubmit = (data: MenuItemFormData) => {
        onSubmit(data);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        void handleSubmit(handleFormSubmit)(e);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle fontWeight={700}>
                {initialData ? 'Edit Menu Item' : 'Add New Item'}
            </DialogTitle>

            <form onSubmit={onFormSubmit}>
                <DialogContent>
                    <Stack gap={4} pt={2}>
                        <TextField
                            {...register(
                                'name',
                                MENU_ITEM_VALIDATION_RULES.name,
                            )}
                            label='Item Name'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                        />
                        <TextField
                            {...register(
                                'category',
                                MENU_ITEM_VALIDATION_RULES.category,
                            )}
                            label='Category'
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            fullWidth
                        />
                        <Stack direction='row' gap={4}>
                            <TextField
                                {...register(
                                    'price',
                                    MENU_ITEM_VALIDATION_RULES.price,
                                )}
                                type='number'
                                label='Price (₹)'
                                error={!!errors.price}
                                helperText={errors.price?.message}
                                fullWidth
                            />
                            <TextField
                                {...register(
                                    'quantity',
                                    MENU_ITEM_VALIDATION_RULES.quantity,
                                )}
                                type='number'
                                label='Stock Quantity'
                                error={!!errors.quantity}
                                helperText={errors.quantity?.message}
                                fullWidth
                            />
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 6, pb: 4 }}>
                    <Button
                        variant='text'
                        color='inherit'
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Item'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
