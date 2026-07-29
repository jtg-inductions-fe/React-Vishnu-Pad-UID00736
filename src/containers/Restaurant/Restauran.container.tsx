import { useNavigate } from 'react-router-dom';

import { restaurantApi } from '@api/restaurant.api';
import { ErrorState } from '@components';
import { ROUTES } from '@constant';

import { RestaurantContainerProps } from './Restaurant.types';
import { RestaurantList } from './subComponents';

export const RestaurantContainer = ({
    limit,
    layout = 'grid',
}: RestaurantContainerProps) => {
    const navigate = useNavigate();
    const { useGetRestaurantsQuery } = restaurantApi;
    const {
        data: restaurants,
        isLoading,
        error,
        refetch,
    } = useGetRestaurantsQuery();

    const handleExploreRestaurant = (restaurantId: string | number) => () => {
        void navigate(`${ROUTES.MENU}?restaurant_id=${restaurantId}`);
    };

    const handleViewAll = () => {
        void navigate(ROUTES.RESTAURANTS);
    };

    if (error) {
        return (
            <ErrorState
                actionLabel='Retry'
                onActionClick={() => void refetch()}
            />
        );
    }

    const displayRestaurants = limit
        ? restaurants?.slice(0, limit)
        : restaurants;

    return (
        <RestaurantList
            restaurants={displayRestaurants || []}
            isLoading={isLoading}
            layout={layout}
            onViewAll={handleViewAll}
            onExploreRestaurant={handleExploreRestaurant}
        />
    );
};
