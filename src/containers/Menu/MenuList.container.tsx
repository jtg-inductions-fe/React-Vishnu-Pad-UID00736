import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { menuApi } from '@api/menu.api';
import { FoodPlaceholder } from '@assets/images';
import {
    EmptyState,
    ErrorState,
    HorizontalSection,
    ItemSkeletonLoader,
    MenuItemCard,
} from '@components';
import { ROUTES } from '@constant';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToCart, removeFromCart, removeItemCompletely } from '@store/slices';
import { MenuItem } from '@type';

import { MenuContainerProps } from './MenuList.types';

export const MenuListContainer = ({
    limit,
    layout = 'grid',
    restaurantId,
}: MenuContainerProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const { useGetExploreMenuItemsQuery } = menuApi;
    const {
        data: menuData,
        isLoading,
        error,
        refetch,
    } = useGetExploreMenuItemsQuery(restaurantId);

    const handleAddToCart = (item: MenuItem) => () => dispatch(addToCart(item));
    const handleDecrementCart = (itemId: number) => () =>
        dispatch(removeFromCart(itemId));
    const handleRemoveFromCart = (itemId: number) => () =>
        dispatch(removeItemCompletely(itemId));

    const handleViewAll = () => void navigate(ROUTES.MENU);

    if (error) {
        return (
            <ErrorState
                actionLabel='Retry'
                onActionClick={() => void refetch()}
            />
        );
    }

    if (isLoading) {
        return layout === 'horizontal' ? (
            <ItemSkeletonLoader count={5} minWidth={280} />
        ) : (
            <ItemSkeletonLoader count={12} minWidth={280} layout='grid' />
        );
    }

    const displayItems = limit
        ? menuData?.items.slice(0, limit)
        : menuData?.items;

    if (!displayItems || displayItems.length === 0) {
        return (
            <EmptyState
                title='No Menu Items Found'
                description='Looks like the menu is empty right now. Check back later!'
            />
        );
    }

    const renderCards = (items: MenuItem[], isGrid: boolean) =>
        items.map((item) => {
            const cartItem = cartItems.find(
                (cItem) => Number(cItem.id) === Number(item.id),
            );
            const currentQuantity = cartItem ? cartItem.cartQuantity : 0;
            const isAvailable = item.quantity > 0;

            const card = (
                <MenuItemCard
                    title={item.name}
                    subtitle={item.category}
                    price={item.price}
                    rating={item.rating}
                    tag={isAvailable ? 'In Stock' : 'Out of Stock'}
                    image={FoodPlaceholder}
                    cartQuantity={currentQuantity}
                    actionLabel={isAvailable ? 'Add to Cart' : 'Unavailable'}
                    onActionClick={
                        isAvailable ? handleAddToCart(item) : undefined
                    }
                    onIncrement={handleAddToCart(item)}
                    onDecrement={handleDecrementCart(item.id)}
                    onRemove={handleRemoveFromCart(item.id)}
                />
            );

            if (isGrid) {
                return (
                    <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        {card}
                    </Grid>
                );
            }

            return (
                <Stack key={item.id} minWidth={280}>
                    {card}
                </Stack>
            );
        });

    if (layout === 'horizontal') {
        return (
            <HorizontalSection
                title='Trending Dishes'
                onViewAll={handleViewAll}
            >
                {renderCards(displayItems, false)}
            </HorizontalSection>
        );
    }

    return (
        <Grid container spacing={4}>
            {renderCards(displayItems, true)}
        </Grid>
    );
};
