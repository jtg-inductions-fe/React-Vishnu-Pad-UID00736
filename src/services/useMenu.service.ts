import { useGetExploreMenuItemsQuery } from '@api/menu.api';

export const useMenuService = (restaurantId?: number) => {
    const {
        data: menuData,
        isLoading: isMenuLoading,
        isFetching: isMenuFetching,
        isError: isMenuError,
        error: menuError,
        refetch: refetchMenu,
    } = useGetExploreMenuItemsQuery(restaurantId);

    return {
        menuData,
        isMenuLoading,
        isMenuFetching,
        isMenuError,
        menuError,
        refetchMenu,
    };
};
