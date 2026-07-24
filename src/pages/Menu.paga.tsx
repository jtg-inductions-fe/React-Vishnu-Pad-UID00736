import { useNavigate } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import { useGetExploreMenuItemsQuery } from '@api/menu.api';
import { EmptyState } from '@components/EmptyState';
import { ErrorState } from '@components/ErrorState';
import { ItemCard } from '@components/ItemCard';
import { ItemSkeletonLoader } from '@components/Skeleton';
import { ROUTES } from '@routes/routes.constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToCart, removeFromCart, removeItemCompletely } from '@store/slices';
import { MenuItem } from '@type';

export const MenuPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const {
        data: menuData,
        isLoading,
        error,
        refetch,
    } = useGetExploreMenuItemsQuery();

    const handleAddToCart = (item: MenuItem) => () => {
        dispatch(addToCart(item));
    };

    const handleDecrementCart = (itemId: number) => () => {
        dispatch(removeFromCart(itemId));
    };

    const handleRemoveFromCart = (itemId: number) => () => {
        dispatch(removeItemCompletely(itemId));
    };

    const handleGoHome = () => {
        void navigate(ROUTES.HOME);
    };

    if (error) {
        return (
            <ErrorState
                actionLabel='Retry'
                onActionClick={() => {
                    void refetch();
                }}
            />
        );
    }

    return (
        <Stack gap={7} px={{ xs: 2, md: 4 }} py={4}>
            <Stack gap={0.5}>
                <Typography variant='h3' fontWeight={800}>
                    Full Menu
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Discover all our delicious dishes and beverages
                </Typography>
            </Stack>

            {isLoading ? (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
                    gap={4}
                >
                    {Array.from({ length: 12 }).map((_, index) => (
                        <ItemSkeletonLoader
                            key={index}
                            count={1}
                            minWidth={280}
                        />
                    ))}
                </Box>
            ) : menuData?.items.length === 0 ? (
                <EmptyState
                    title='No Menu Items Found'
                    description='Looks like the menu is empty right now. Check back later!'
                    actionLabel='Back to Home'
                    onActionClick={handleGoHome}
                />
            ) : (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
                    gap={4}
                >
                    {menuData?.items.map((item) => {
                        const cartItem = cartItems.find(
                            (cItem) => Number(cItem.id) === Number(item.id),
                        );
                        const currentQuantity = cartItem
                            ? cartItem.cartQuantity
                            : 0;
                        const isAvailable = item.quantity > 0;

                        return (
                            <ItemCard
                                key={item.id}
                                title={item.name}
                                subtitle={item.category}
                                price={item.price}
                                rating={item.rating}
                                tag={isAvailable ? 'In Stock' : 'Out of Stock'}
                                image={`/src/assets/images/menu/${item.id}.jpg`}
                                cartQuantity={currentQuantity}
                                actionLabel={
                                    isAvailable ? 'Add to Cart' : 'Unavailable'
                                }
                                onActionClick={
                                    isAvailable
                                        ? handleAddToCart(item)
                                        : undefined
                                }
                                onIncrement={handleAddToCart(item)}
                                onDecrement={handleDecrementCart(item.id)}
                                onRemove={handleRemoveFromCart(item.id)}
                            />
                        );
                    })}
                </Box>
            )}
        </Stack>
    );
};
