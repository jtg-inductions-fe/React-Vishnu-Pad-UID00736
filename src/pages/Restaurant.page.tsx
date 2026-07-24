import { useNavigate } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';

import { useGetRestaurantsQuery } from '@api/restaurant.api';
import { EmptyState } from '@components/EmptyState';
import { ErrorState } from '@components/ErrorState';
import { ItemCard } from '@components/ItemCard';
import { ItemSkeletonLoader } from '@components/Skeleton';
import { ROUTES } from '@routes/routes.constants';

export const RestaurantsPage = () => {
    const navigate = useNavigate();

    const {
        data: restaurants,
        isLoading,
        error,
        refetch,
    } = useGetRestaurantsQuery();

    const handleExploreRestaurant = (restaurantId: string | number) => () => {
        void navigate(`${ROUTES.RESTAURANTS}/${restaurantId}`);
    };

    const handleGoHome = () => {
        void navigate(ROUTES.HOME);
    };

    if (error) {
        return (
            <ErrorState
                actionLabel='Retry'
                onActionClick={() => {
                    void refetch();
                }}
            />
        );
    }

    return (
        <Stack gap={7} px={{ xs: 2, md: 4 }} py={4}>
            <Stack gap={0.5}>
                <Typography variant='h3' fontWeight={800}>
                    All Restaurants
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                    Explore our complete list of top-rated restaurants
                </Typography>
            </Stack>

            {isLoading ? (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(300px, 1fr))'
                    gap={4}
                >
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ItemSkeletonLoader
                            key={index}
                            count={1}
                            minWidth={300}
                        />
                    ))}
                </Box>
            ) : restaurants?.length === 0 ? (
                <EmptyState
                    title='No Restaurants Found'
                    description="We currently don't have any restaurants to display."
                    actionLabel='Back to Home'
                    onActionClick={handleGoHome}
                />
            ) : (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(300px, 1fr))'
                    gap={4}
                >
                    {restaurants?.map((restaurant) => (
                        <ItemCard
                            key={restaurant.id}
                            title={restaurant.name}
                            subtitle={`Added on: ${new Date(restaurant.created_at).toLocaleDateString()}`}
                            image={`/src/assets/images/restaurants/${restaurant.id}.jpg`}
                            actionLabel='Explore Restaurant'
                            onActionClick={handleExploreRestaurant(
                                restaurant.id,
                            )}
                        />
                    ))}
                </Box>
            )}
        </Stack>
    );
};
