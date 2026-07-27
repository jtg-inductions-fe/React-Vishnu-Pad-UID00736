import { useGetExploreMenuItemsQuery } from '@api/menu.api';

export const useMenuService = () => {
    const {
        data: menuData,
        isLoading: isMenuLoading,
        isFetching: isMenuFetching,
        isError: isMenuError,
        error: menuError,
        refetch: refetchMenu,
    } = useGetExploreMenuItemsQuery();

    return {
        menuData,
        isMenuLoading,
        isMenuFetching,
        isMenuError,
        menuError,
        refetchMenu,
    };
};
