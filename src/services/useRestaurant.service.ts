import { useGetRestaurantsQuery } from '@api/restaurant.api';

export const useRestaurantService = () => {
    const {
        data: restaurants,
        isLoading: isRestaurantsLoading,
        isFetching: isRestaurantsFetching,
        isError: isRestaurantsError,
        error: restaurantsError,
        refetch: refetchRestaurants,
    } = useGetRestaurantsQuery();

    return {
        restaurants,
        isRestaurantsLoading,
        isRestaurantsFetching,
        isRestaurantsError,
        restaurantsError,
        refetchRestaurants,
    };
};
