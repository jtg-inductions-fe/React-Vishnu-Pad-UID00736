import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';
<<<<<<< HEAD
import Grid from '@mui/material/Grid2';

import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import {
    EmptyState,
    ErrorState,
    ItemCard,
    ItemSkeletonLoader,
    SearchBar,
} from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';
import { useMenuService } from '@services';
=======

import { useGetExploreMenuItemsQuery } from '@api/menu.api';
import { EmptyState } from '@components/EmptyState';
import { ErrorState } from '@components/ErrorState';
import { ItemCard } from '@components/ItemCard';
import { ItemSkeletonLoader } from '@components/Skeleton';
import { ROUTES } from '@routes/routes.constants';
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToCart, removeFromCart, removeItemCompletely } from '@store/slices';
import { MenuItem } from '@type';

export const MenuPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const [searchParams] = useSearchParams();

    const restaurantId = searchParams.get('restaurant_id');
<<<<<<< HEAD
    const restaurantIdNumber = restaurantId ? Number(restaurantId) : undefined;

    const {
        menuData,
        isMenuLoading: isLoading,
        menuError: error,
        refetchMenu: refetch,
    } = useMenuService(restaurantIdNumber);
=======

    const restaurantIdNumber = restaurantId ? Number(restaurantId) : undefined;

    const {
        data: menuData,
        isLoading,
        error,
        refetch,
    } = useGetExploreMenuItemsQuery(restaurantIdNumber);
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)

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
<<<<<<< HEAD
        <Stack gap={8} px={{ xs: 2, md: 4 }} py={4}>
            <Stack
                direction={{ md: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={4}
                width='100%'
            >
                <Stack gap={0.5}>
                    <Typography variant='h3' fontWeight={FONT_WEIGHT.BOLD}>
                        Full Menu
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Discover all our delicious dishes and beverages
                    </Typography>
                </Stack>

                <Box
                    sx={(theme) => ({
                        width: {
                            xs: '100%',
                            md: theme.spacing(100),
                        },
                    })}
                >
                    <SearchBar placeholder='Search for dishes, cuisines...' />
                </Box>
            </Stack>

            {isLoading ? (
                <ItemSkeletonLoader count={12} minWidth={280} layout='grid' />
            ) : !menuData || menuData.items.length === 0 ? (
=======
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
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
                <EmptyState
                    title='No Menu Items Found'
                    description='Looks like the menu is empty right now. Check back later!'
                    actionLabel='Back to Home'
                    onActionClick={handleGoHome}
                />
            ) : (
<<<<<<< HEAD
                <Grid container spacing={4}>
                    {menuData.items.map((item) => {
=======
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
                    gap={4}
                >
                    {menuData?.items.map((item) => {
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
                        const cartItem = cartItems.find(
                            (cItem) => Number(cItem.id) === Number(item.id),
                        );
                        const currentQuantity = cartItem
                            ? cartItem.cartQuantity
                            : 0;
                        const isAvailable = item.quantity > 0;

                        return (
<<<<<<< HEAD
                            <Grid
                                key={item.id}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            >
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
                                    image={FoodPlaceholder}
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
                                    onDecrement={handleDecrementCart(item.id)}
                                    onRemove={handleRemoveFromCart(item.id)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
=======
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
>>>>>>> 63431eb ([VP_A3_06]: Done with cart)
            )}
        </Stack>
    );
};
