import { useNavigate } from 'react-router-dom';

import { menuApi } from '@api/menu.api';
import { ErrorState } from '@components';
import { ROUTES } from '@constant';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addToCart, removeFromCart, removeItemCompletely } from '@store/slices';
import { MenuItem } from '@type';

import { MenuContainerProps } from './menu.types';
import { MenuList } from './subComponents';

export const MenuContainer = ({
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

    const displayItems = limit
        ? menuData?.items.slice(0, limit)
        : menuData?.items;

    return (
        <MenuList
            menuItems={displayItems || []}
            cartItems={cartItems}
            isLoading={isLoading}
            layout={layout}
            onViewAll={handleViewAll}
            onAddToCart={handleAddToCart}
            onDecrementCart={handleDecrementCart}
            onRemoveFromCart={handleRemoveFromCart}
        />
    );
};
