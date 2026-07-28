import { useNavigate } from 'react-router-dom';

import { Skeleton, Stack, Typography } from '@mui/material';

import FoodPlaceholder from '@assets/images/placeholders/food-placeholder.webp';
import RestaurantPlaceholder from '@assets/images/placeholders/restaurant-placeholder.webp';
import { EmptyState, ErrorState } from '@components';
import { HorizontalSection } from '@components';
import { MenuItemCard, RestaurantCard } from '@components';
import { ItemSkeletonLoader } from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';
import { useMenuService } from '@services';
import { useRestaurantService } from '@services';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToCart, removeFromCart, removeItemCompletely } from '@store/slices';
import { MenuItem } from '@type';

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const {
        restaurants,
        isRestaurantsLoading,
        restaurantsError,
        refetchRestaurants,
    } = useRestaurantService();

    const { menuData, isMenuLoading, menuError, refetchMenu } =
        useMenuService();

    const displayRestaurants = restaurants?.slice(0, 10) || [];
    const displayMenuItems = menuData?.items.slice(0, 10) || [];

    const handleViewAllRestaurants = () => {
        void navigate(ROUTES.RESTAURANTS);
    };

    const handleExploreRestaurant = (restaurantId: string | number) => () => {
        void navigate(`${ROUTES.MENU}?restaurant_id=${restaurantId}`);
    };

    const handleViewAllMenu = () => {
        void navigate(ROUTES.MENU);
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

    const formatDate = (date: string | Date) =>
        new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

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

    const isDataEmpty =
        !isRestaurantsLoading &&
        !isMenuLoading &&
        displayRestaurants.length === 0 &&
        displayMenuItems.length === 0;

    if (isDataEmpty) {
        return (
            <EmptyState
                title='No Items Available'
                description="We couldn't find any restaurants or menu items at the moment. Please try again later."
                actionLabel='Refresh Page'
                onActionClick={() => {
                    void refetchRestaurants();
                    void refetchMenu();
                }}
            />
        );
    }

    return (
        <Stack gap={8} px={{ xs: 2, md: 4 }} py={4}>
            <Stack gap={0.5}>
                <Typography variant='h3' fontWeight={FONT_WEIGHT.BOLD}>
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
                                <RestaurantCard
                                    title={restaurant.name}
                                    subtitle={`Joined on: ${formatDate(restaurant.created_at)}`}
                                    image={RestaurantPlaceholder}
                                    actionLabel='Explore Menu'
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
                                    <MenuItemCard
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
        </Stack>
    );
};
