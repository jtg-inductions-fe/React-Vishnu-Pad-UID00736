import {
    useGetMyRestaurantsQuery,
    useGetRestaurantsQuery,
} from '@api/restaurant.api';

export const useRestaurantService = () => {
    const {
        data: restaurants,
        isLoading: isRestaurantsLoading,
        isFetching: isRestaurantsFetching,
        isError: isRestaurantsError,
        error: restaurantsError,
        refetch: refetchRestaurants,
    } = useGetRestaurantsQuery();

    const {
        data: myRestaurants,
        isLoading: isMyRestaurantsLoading,
        isFetching: isMyRestaurantsFetching,
        isError: isMyRestaurantsError,
        error: myRestaurantsError,
        refetch: refetchMyRestaurants,
    } = useGetMyRestaurantsQuery();

    return {
        restaurants,
        isRestaurantsLoading,
        isRestaurantsFetching,
        isRestaurantsError,
        restaurantsError,
        refetchRestaurants,

        myRestaurants,
        isMyRestaurantsLoading,
        isMyRestaurantsFetching,
        isMyRestaurantsError,
        myRestaurantsError,
        refetchMyRestaurants,
    };
};
