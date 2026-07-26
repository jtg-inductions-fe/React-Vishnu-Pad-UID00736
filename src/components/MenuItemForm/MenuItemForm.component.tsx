import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    MenuItemFormValues,
    menuItemSchema,
} from '@validations/menuItem.schema';

import { MenuItemFormProps } from './MenuItemForm.types';

export const MenuItemFormModal = ({
    open,
    onClose,
    onSubmit,
    initialData,
    isLoading,
}: MenuItemFormProps) => {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<MenuItemFormValues>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            name: '',
            category: '',
            price: '' as unknown as number,
            quantity: '' as unknown as number,
        },
    });

    useEffect(() => {
        if (open) {
            reset(
                initialData || {
                    name: '',
                    category: '',
                    price: '' as unknown as number,
                    quantity: '' as unknown as number,
                },
            );
        }
    }, [open, initialData, reset]);

    const handleFormSubmit = handleSubmit((data) => {
        onSubmit(data);
    });

    const onSaveClick = () => {
        void handleFormSubmit();
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(
            'price',
            val === '' ? ('' as unknown as number) : Number(val),
            { shouldValidate: true, shouldDirty: true },
        );
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(
            'quantity',
            val === '' ? ('' as unknown as number) : Number(val),
            { shouldValidate: true, shouldDirty: true },
        );
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle fontWeight={700}>
                {initialData ? 'Edit Menu Item' : 'Add New Item'}
            </DialogTitle>

            <DialogContent>
                <Stack gap={4} pt={2}>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Item Name'
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name='category'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Category'
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            />
                        )}
                    />
                    <Stack direction='row' gap={4}>
                        <Controller
                            name='price'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type='number'
                                    label='Price (₹)'
                                    value={field.value ?? ''}
                                    onChange={handlePriceChange}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                />
                            )}
                        />
                        <Controller
                            name='quantity'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type='number'
                                    label='Stock Quantity'
                                    value={field.value ?? ''}
                                    onChange={handleQuantityChange}
                                    error={!!errors.quantity}
                                    helperText={errors.quantity?.message}
                                />
                            )}
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
                    variant='contained'
                    color='primary'
                    onClick={onSaveClick}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Item'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
