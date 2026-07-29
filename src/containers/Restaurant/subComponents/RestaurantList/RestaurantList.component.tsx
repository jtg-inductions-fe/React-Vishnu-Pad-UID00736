import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { RestaurantPlaceholder } from '@assets/images';
import {
    EmptyState,
    HorizontalSection,
    ItemSkeletonLoader,
    RestaurantCard,
} from '@components';
import { formatDate } from '@utils';

import { RestaurantListProps } from './RestaurantList.types';

export const RestaurantList = ({
    restaurants,
    isLoading,
    layout = 'grid',
    onViewAll,
    onExploreRestaurant,
}: RestaurantListProps) => {
    if (isLoading) {
        return layout === 'horizontal' ? (
            <ItemSkeletonLoader count={5} minWidth={300} />
        ) : (
            <ItemSkeletonLoader count={8} minWidth={300} layout='grid' />
        );
    }

    if (!restaurants || restaurants.length === 0) {
        return (
            <EmptyState
                title='No Restaurants Found'
                description="We currently don't have any restaurants to display."
            />
        );
    }

    if (layout === 'horizontal') {
        return (
            <HorizontalSection title='Top Restaurants' onViewAll={onViewAll}>
                {restaurants.map((restaurant) => (
                    <Stack key={restaurant.id} minWidth={300}>
                        <RestaurantCard
                            title={restaurant.name}
                            subtitle={`Joined on: ${formatDate(restaurant.created_at)}`}
                            image={RestaurantPlaceholder}
                            actionLabel='Explore Menu'
                            onActionClick={onExploreRestaurant(restaurant.id)}
                        />
                    </Stack>
                ))}
            </HorizontalSection>
        );
    }

    return (
        <Grid container spacing={4}>
            {restaurants.map((restaurant) => (
                <Grid
                    key={restaurant.id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                    <RestaurantCard
                        title={restaurant.name}
                        subtitle={`Joined on: ${formatDate(restaurant.created_at)}`}
                        image={RestaurantPlaceholder}
                        actionLabel='Explore Menu'
                        onActionClick={onExploreRestaurant(restaurant.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
