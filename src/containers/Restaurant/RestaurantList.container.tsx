import { useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { restaurantApi } from '@api/restaurant.api';
import { RestaurantPlaceholder } from '@assets/images';
import {
    EmptyState,
    ErrorState,
    HorizontalSection,
    ItemSkeletonLoader,
    RestaurantCard,
} from '@components';
import { ROUTES } from '@constant';
import { formatDate } from '@utils/common.utils';

import { RestaurantContainerProps } from './RestaurantList.types';

export const RestaurantListContainer = ({
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

    if (isLoading) {
        return layout === 'horizontal' ? (
            <ItemSkeletonLoader count={5} minWidth={300} />
        ) : (
            <ItemSkeletonLoader count={8} minWidth={300} layout='grid' />
        );
    }

    const displayRestaurants = limit
        ? restaurants?.slice(0, limit)
        : restaurants;

    if (!displayRestaurants || displayRestaurants.length === 0) {
        return (
            <EmptyState
                title='No Restaurants Found'
                description="We currently don't have any restaurants to display."
            />
        );
    }

    if (layout === 'horizontal') {
        return (
            <HorizontalSection
                title='Top Restaurants'
                onViewAll={handleViewAll}
            >
                {displayRestaurants.map((restaurant) => (
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
                ))}
            </HorizontalSection>
        );
    }

    return (
        <Grid container spacing={4}>
            {displayRestaurants.map((restaurant) => (
                <Grid
                    key={restaurant.id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                    <RestaurantCard
                        title={restaurant.name}
                        subtitle={`Joined on: ${formatDate(restaurant.created_at)}`}
                        image={RestaurantPlaceholder}
                        actionLabel='Explore Menu'
                        onActionClick={handleExploreRestaurant(restaurant.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
