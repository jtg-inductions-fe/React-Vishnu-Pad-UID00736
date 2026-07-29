import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Grid2, Stack } from '@mui/material';

import { orderApi } from '@api/order.api';
import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import { BillSummary, EmptyState, ItemListRow } from '@components';
import { ROUTES } from '@constant';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
    addToCart,
    clearCart,
    removeFromCart,
    removeItemCompletely,
} from '@store/slices';
import { CartItem } from '@type/cart.types';
import { getErrorMessage } from '@utils/ErrorHandler';
import { validateCartCheckout } from '@validations/order.validation';

export const CartContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state) => state.cart.items);
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const { useCreateOrderMutation } = orderApi;
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const {
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * item.cartQuantity,
        0,
    );

    const totalQuantity = cartItems.reduce(
        (acc, item) => acc + item.cartQuantity,
        0,
    );

    const uniqueRestaurantIds = new Set(
        cartItems.map((item) => item.restaurant_id),
    );

    const hasMultipleRestaurants = uniqueRestaurantIds.size > 1;
    const firstRestaurantId =
        cartItems.length > 0 ? cartItems[0].restaurant_id : 0;
    const userBalance = Number(user?.balance) || 0;

    useEffect(() => {
        if (cartItems.length === 0) return;

        const validation = validateCartCheckout({
            cartItems,
            totalAmount,
            userBalance,
            hasMultipleRestaurants,
        });

        if (!validation.isValid) {
            setError('root', {
                type: 'manual',
                message: validation.errorMessage,
            });
        } else {
            clearErrors('root');
        }
    }, [
        cartItems,
        totalAmount,
        userBalance,
        hasMultipleRestaurants,
        setError,
        clearErrors,
    ]);

    const handleIncrement = (item: CartItem) => () => {
        dispatch(addToCart(item));
    };

    const handleDecrement = (itemId: number) => () => {
        dispatch(removeFromCart(itemId));
    };

    const handleRemove = (itemId: number) => () => {
        dispatch(removeItemCompletely(itemId));
    };

    const onSubmit = async () => {
        const validation = validateCartCheckout({
            cartItems,
            totalAmount,
            userBalance,
            hasMultipleRestaurants,
        });

        if (!validation.isValid) {
            return;
        }

        try {
            await createOrder({
                restaurant_id: firstRestaurantId,
                items: cartItems.map((item) => ({
                    item_id: item.id,
                    quantity: item.cartQuantity,
                })),
            }).unwrap();

            toast.success('Order placed successfully!');
            dispatch(clearCart());
            void navigate(ROUTES.MY_ORDERS);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError('root', { type: 'manual', message: errorMessage });
            toast.error('Failed to place order. Please try again.');
        }
    };

    const handleExploreRestaurants = () => {
        void navigate(ROUTES.RESTAURANTS);
    };

    const handleCheckoutActionClick = () => {
        if (!isAuthenticated) {
            void navigate(ROUTES.LOGIN);
        } else {
            void handleSubmit(onSubmit)();
        }
    };

    if (cartItems.length === 0) {
        return (
            <EmptyState
                title='Your cart is empty'
                description='Looks like you haven’t added anything to your cart yet.'
                actionLabel='Explore Restaurants'
                onActionClick={handleExploreRestaurants}
            />
        );
    }

    const isCheckoutDisabled =
        hasMultipleRestaurants || userBalance < totalAmount;

    return (
        <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 8 }}>
                <Stack gap={2} divider={<Divider />}>
                    {cartItems.map((item) => (
                        <ItemListRow
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={Number(item.price)}
                            image={FoodPlaceholder}
                            quantity={item.cartQuantity}
                            onIncrement={handleIncrement(item)}
                            onDecrement={handleDecrement(item.id)}
                            onRemove={handleRemove(item.id)}
                        />
                    ))}
                </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
                <Box position='sticky' top={24}>
                    <BillSummary
                        totalAmount={totalAmount}
                        totalQuantity={totalQuantity}
                        userBalance={userBalance}
                        isLoggedIn={isAuthenticated}
                        isActionDisabled={isCheckoutDisabled}
                        actionLabel='Place Order'
                        onActionClick={handleCheckoutActionClick}
                        isLoading={isLoading}
                        errorMessage={errors.root?.message}
                    />
                </Box>
            </Grid2>
        </Grid2>
    );
};
