<<<<<<< HEAD
import { useForm } from 'react-hook-form';
=======
import { useState } from 'react';

>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Grid2, Stack, Typography } from '@mui/material';

<<<<<<< HEAD
import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import { BillSummary, EmptyState, ItemListRow } from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';
import { useOrderService } from '@services';
=======
import { useCreateOrderMutation } from '@api/order.api';
import { BillSummary } from '@components/BillSummary';
import { EmptyState } from '@components/EmptyState';
import { ItemListRow } from '@components/ItemListRow';
import { ROUTES } from '@routes/routes.constants';
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
    addToCart,
    clearCart,
    removeFromCart,
    removeItemCompletely,
} from '@store/slices';
import { MenuItem } from '@type';
import { getErrorMessage } from '@utils/ErrorHandler';
<<<<<<< HEAD
import { validateCartCheckout } from '@validations/order.validation';
=======
import {
    CartCheckoutSchema,
    CartCheckoutType,
} from '@validations/order.schema';
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)

export const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state) => state.cart.items);
<<<<<<< HEAD
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const { createOrder, isLoading } = useOrderService();

    const {
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleIncrement = (item: MenuItem) => () => {
        dispatch(addToCart(item));
        clearErrors('root');
=======

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const handleIncrement = (item: MenuItem) => () => {
        dispatch(addToCart(item));
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
    };

    const handleDecrement = (itemId: number) => () => {
        dispatch(removeFromCart(itemId));
<<<<<<< HEAD
        clearErrors('root');
=======
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
    };

    const handleRemove = (itemId: number) => () => {
        dispatch(removeItemCompletely(itemId));
<<<<<<< HEAD
        clearErrors('root');
=======
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
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
<<<<<<< HEAD
    const userBalance = Number(user?.balance) || 0;

    const onSubmit = async () => {
        clearErrors('root');

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
=======

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
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
            return;
        }

        try {
            await createOrder({
<<<<<<< HEAD
                restaurant_id: firstRestaurantId,
                items: cartItems.map((item) => ({
                    item_id: item.id,
                    quantity: item.cartQuantity,
                })),
            });

            toast.success('Order placed successfully!');
=======
                restaurant_id: validationResult.data.restaurantId,
                items: validationResult.data.items,
            }).unwrap();

            toast.success('Order placed successfully!');

>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
            dispatch(clearCart());
            void navigate(ROUTES.MY_ORDERS);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
<<<<<<< HEAD
            setError('root', { type: 'manual', message: errorMessage });
=======
            setCheckoutError(errorMessage);

>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
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
<<<<<<< HEAD
            void handleSubmit(onSubmit)();
=======
            void handlePlaceOrder();
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
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
<<<<<<< HEAD
            <Typography variant='h4' fontWeight={FONT_WEIGHT.BOLD}>
=======
            <Typography variant='h4' fontWeight={800}>
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
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
<<<<<<< HEAD
                                image={FoodPlaceholder}
=======
                                image={`/src/assets/images/menu/${item.id}.jpg`}
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
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
<<<<<<< HEAD
                            userBalance={userBalance}
=======
                            userBalance={Number(user?.balance)}
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
                            isLoggedIn={isAuthenticated}
                            isActionDisabled={hasMultipleRestaurants}
                            actionLabel='Place Order'
                            onActionClick={handleCheckoutActionClick}
                            isLoading={isLoading}
                            errorMessage={
                                hasMultipleRestaurants
                                    ? 'All items must be from the same restaurant.'
<<<<<<< HEAD
                                    : errors.root?.message
=======
                                    : checkoutError
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
                            }
                        />
                    </Box>
                </Grid2>
            </Grid2>
        </Stack>
    );
};
