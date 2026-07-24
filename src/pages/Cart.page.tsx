import { useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Grid2, Stack, Typography } from '@mui/material';

import { useCreateOrderMutation } from '@api/order.api';
import { BillSummary } from '@components/BillSummary';
import { EmptyState } from '@components/EmptyState';
import { ItemListRow } from '@components/ItemListRow';
import { ROUTES } from '@routes/routes.constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
    addToCart,
    clearCart,
    removeFromCart,
    removeItemCompletely,
} from '@store/slices';
import { MenuItem } from '@type';
import { getErrorMessage } from '@utils/ErrorHandler';
import {
    CartCheckoutSchema,
    CartCheckoutType,
} from '@validations/order.schema';

export const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state) => state.cart.items);

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const handleIncrement = (item: MenuItem) => () => {
        dispatch(addToCart(item));
    };

    const handleDecrement = (itemId: number) => () => {
        dispatch(removeFromCart(itemId));
    };

    const handleRemove = (itemId: number) => () => {
        dispatch(removeItemCompletely(itemId));
    };

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

    const handlePlaceOrder = async () => {
        setCheckoutError(null);

        const validationPayload: CartCheckoutType = {
            restaurantId: firstRestaurantId,
            items: cartItems.map((item) => ({
                item_id: item.id,
                quantity: item.cartQuantity,
            })),
            totalAmount,
            userBalance: Number(user?.balance) || 0,
            hasMultipleRestaurants,
        };

        const validationResult =
            CartCheckoutSchema.safeParse(validationPayload);

        if (!validationResult.success) {
            setCheckoutError(validationResult.error.issues[0].message);
            return;
        }

        try {
            await createOrder({
                restaurant_id: validationResult.data.restaurantId,
                items: validationResult.data.items,
            }).unwrap();

            toast.success('Order placed successfully!');

            dispatch(clearCart());
            void navigate(ROUTES.MY_ORDERS);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setCheckoutError(errorMessage);

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
            void handlePlaceOrder();
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

    return (
        <Stack gap={4} px={{ xs: 2, md: 4 }} py={4} maxWidth='xl' mx='auto'>
            <Typography variant='h4' fontWeight={800}>
                Your Cart
            </Typography>

            <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                    <Stack gap={2} divider={<Divider />}>
                        {cartItems.map((item) => (
                            <ItemListRow
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={Number(item.price)}
                                image={`/src/assets/images/menu/${item.id}.jpg`}
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
                            userBalance={Number(user?.balance)}
                            isLoggedIn={isAuthenticated}
                            isActionDisabled={hasMultipleRestaurants}
                            actionLabel='Place Order'
                            onActionClick={handleCheckoutActionClick}
                            isLoading={isLoading}
                            errorMessage={
                                hasMultipleRestaurants
                                    ? 'All items must be from the same restaurant.'
                                    : checkoutError
                            }
                        />
                    </Box>
                </Grid2>
            </Grid2>
        </Stack>
    );
};
