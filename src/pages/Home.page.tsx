import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Alert, Skeleton, Snackbar, Stack, Typography } from '@mui/material';

import { useGetExploreMenuItemsQuery } from '@api/menu.api';
import { useGetRestaurantsQuery } from '@api/restaurant.api';
import { ErrorState } from '@components/ErrorState';
import { Footer } from '@components/Footer';
import { HorizontalSection } from '@components/HorizontalSection';
import { ItemCard } from '@components/ItemCard';
import { ItemSkeletonLoader } from '@components/Skeleton';
import { ROUTES } from '@routes/routes.constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToCart, removeFromCart, removeItemCompletely } from '@store/slices';
import { MenuItem } from '@type';

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const [isMenuToastOpen, setIsMenuToastOpen] = useState(false);

    const {
        data: restaurants,
        isLoading: isRestaurantsLoading,
        error: restaurantsError,
        refetch: refetchRestaurants,
    } = useGetRestaurantsQuery();

    const {
        data: menuData,
        isLoading: isMenuLoading,
        error: menuError,
        refetch: refetchMenu,
    } = useGetExploreMenuItemsQuery();

    const displayRestaurants = restaurants?.slice(0, 10) || [];
    const displayMenuItems = menuData?.items.slice(0, 10) || [];

    const handleViewAllRestaurants = () => {
        void navigate(ROUTES.RESTAURANTS);
    };

    const handleExploreRestaurant = (restaurantId: string | number) => () => {
        void navigate(`${ROUTES.RESTAURANTS}/${restaurantId}`);
    };

    const handleViewAllMenu = () => {
        setIsMenuToastOpen(true);
    };

    const handleCloseMenuToast = (
        _event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') return;
        setIsMenuToastOpen(false);
    };

    const handleAddToCart = (item: MenuItem) => () => {
        dispatch(addToCart(item));
    };

    const handleDecrementCart = (itemId: number) => () => {
        dispatch(removeFromCart(itemId));
    };

    const handleRemoveFromCart = (itemId: number) => () => {
        dispatch(removeItemCompletely(itemId));
    };

    if (restaurantsError || menuError) {
        return (
            <ErrorState
                actionLabel='Retry'
                onActionClick={() => {
                    void refetchRestaurants();
                    void refetchMenu();
                }}
            />
        );
    }

    return (
        <Stack gap={7} px={{ xs: 2, md: 4 }} py={4}>
            <Stack gap={0.5}>
                <Typography variant='h3' fontWeight={800}>
                    Explore Best Food
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Discover top-rated restaurants and dishes near you
                </Typography>
            </Stack>

            {isRestaurantsLoading ? (
                <Stack gap={2}>
                    <Skeleton variant='text' width={180} height={36} />
                    <ItemSkeletonLoader count={8} minWidth={300} />
                </Stack>
            ) : (
                <HorizontalSection
                    title='Top Restaurants'
                    onViewAll={handleViewAllRestaurants}
                >
                    {displayRestaurants.length === 0 ? (
                        <Typography variant='body2' color='text.secondary'>
                            No restaurants available at the moment.
                        </Typography>
                    ) : (
                        displayRestaurants.map((restaurant) => (
                            <Stack key={restaurant.id} minWidth={300}>
                                <ItemCard
                                    title={restaurant.name}
                                    subtitle={`Added on: ${new Date(restaurant.created_at).toLocaleDateString()}`}
                                    image={`/src/assets/images/restaurants/${restaurant.id}.jpg`}
                                    actionLabel='Explore Restaurant'
                                    onActionClick={handleExploreRestaurant(
                                        restaurant.id,
                                    )}
                                />
                            </Stack>
                        ))
                    )}
                </HorizontalSection>
            )}

            {isMenuLoading ? (
                <Stack gap={2}>
                    <Skeleton variant='text' width={180} height={36} />
                    <ItemSkeletonLoader count={8} minWidth={280} />
                </Stack>
            ) : (
                <HorizontalSection
                    title='Trending Dishes'
                    onViewAll={handleViewAllMenu}
                >
                    {displayMenuItems.length === 0 ? (
                        <Typography variant='body2' color='text.secondary'>
                            No menu items available at the moment.
                        </Typography>
                    ) : (
                        displayMenuItems.map((item) => {
                            const cartItem = cartItems.find(
                                (cItem) => Number(cItem.id) === Number(item.id),
                            );
                            const currentQuantity = cartItem
                                ? cartItem.cartQuantity
                                : 0;
                            const isAvailable = item.quantity > 0;

                            return (
                                <Stack key={item.id} minWidth={280}>
                                    <ItemCard
                                        title={item.name}
                                        subtitle={item.category}
                                        price={item.price}
                                        rating={item.rating}
                                        tag={
                                            isAvailable
                                                ? 'In Stock'
                                                : 'Out of Stock'
                                        }
                                        image={`/src/assets/images/menu/${item.id}.jpg`}
                                        cartQuantity={currentQuantity}
                                        actionLabel={
                                            isAvailable
                                                ? 'Add to Cart'
                                                : 'Unavailable'
                                        }
                                        onActionClick={
                                            isAvailable
                                                ? handleAddToCart(item)
                                                : undefined
                                        }
                                        onIncrement={handleAddToCart(item)}
                                        onDecrement={handleDecrementCart(
                                            item.id,
                                        )}
                                        onRemove={handleRemoveFromCart(item.id)}
                                    />
                                </Stack>
                            );
                        })
                    )}
                </HorizontalSection>
            )}

            <Footer />

            <Snackbar
                open={isMenuToastOpen}
                autoHideDuration={3000}
                onClose={handleCloseMenuToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseMenuToast}
                    severity='info'
                    variant='filled'
                    sx={{ width: '100%', borderRadius: 2 }}
                >
                    Full Menu feature is coming soon!
                </Alert>
            </Snackbar>
        </Stack>
    );
};
