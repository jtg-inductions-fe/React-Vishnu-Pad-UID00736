import { useNavigate } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { restaurantApi } from '@api/restaurant.api';
import RestaurantPlaceholder from '@assets/images/placeholders/restaurant-placeholder.webp';
import {
    EmptyState,
    ErrorState,
    ItemSkeletonLoader,
    RestaurantCard,
    SearchBar,
} from '@components';
import { FONT_WEIGHT, ROUTES } from '@constant';

export const RestaurantsPage = () => {
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

    const handleGoHome = () => {
        void navigate(ROUTES.HOME);
    };

    const handleRetry = () => {
        void refetch();
    };

    const formatDate = (date: string | Date) =>
        new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

    if (error) {
        return <ErrorState actionLabel='Retry' onActionClick={handleRetry} />;
    }

    return (
        <Stack gap={8} px={{ xs: 2, md: 4 }} py={4}>
            <Stack
                direction={{ md: 'row' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', md: 'center' }}
                gap={4}
                width='100%'
            >
                <Stack gap={0.5}>
                    <Typography variant='h3' fontWeight={FONT_WEIGHT.BOLD}>
                        All Restaurants
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        Explore our complete list of top-rated restaurants
                    </Typography>
                </Stack>

                <Box
                    sx={(theme) => ({
                        width: {
                            xs: '100%',
                            md: theme.spacing(100),
                        },
                    })}
                >
                    <SearchBar placeholder='Search for restaurants, cuisines...' />
                </Box>
            </Stack>

            {isLoading ? (
                <ItemSkeletonLoader count={8} minWidth={300} layout='grid' />
            ) : restaurants?.length === 0 ? (
                <EmptyState
                    title='No Restaurants Found'
                    description="We currently don't have any restaurants to display."
                    actionLabel='Back to Home'
                    onActionClick={handleGoHome}
                />
            ) : (
                <Grid container spacing={4}>
                    {restaurants?.map((restaurant) => (
                        <Grid
                            key={restaurant.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <RestaurantCard
                                title={restaurant.name}
                                subtitle={`Joined on: ${formatDate(restaurant.created_at)}`}
                                image={RestaurantPlaceholder}
                                actionLabel='Explore Menu'
                                onActionClick={handleExploreRestaurant(
                                    restaurant.id,
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Stack>
    );
};
