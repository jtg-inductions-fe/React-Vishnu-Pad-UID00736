import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { FoodPlaceholder } from '@assets/images';
import {
    EmptyState,
    HorizontalSection,
    ItemSkeletonLoader,
    MenuItemCard,
} from '@components';
import { MenuItem } from '@type';

import { MenuListProps } from './MenuList.types';

export const MenuList = ({
    menuItems,
    cartItems,
    isLoading,
    layout = 'grid',
    onViewAll,
    onAddToCart,
    onDecrementCart,
    onRemoveFromCart,
}: MenuListProps) => {
    if (isLoading) {
        return layout === 'horizontal' ? (
            <ItemSkeletonLoader count={5} minWidth={280} />
        ) : (
            <ItemSkeletonLoader count={12} minWidth={280} layout='grid' />
        );
    }

    if (!menuItems || menuItems.length === 0) {
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
                    onActionClick={isAvailable ? onAddToCart(item) : undefined}
                    onIncrement={onAddToCart(item)}
                    onDecrement={onDecrementCart(item.id)}
                    onRemove={onRemoveFromCart(item.id)}
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
            <HorizontalSection title='Trending Dishes' onViewAll={onViewAll}>
                {renderCards(menuItems, false)}
            </HorizontalSection>
        );
    }

    return (
        <Grid container spacing={4}>
            {renderCards(menuItems, true)}
        </Grid>
    );
};
