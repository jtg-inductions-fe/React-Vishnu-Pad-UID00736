import { useNavigate } from 'react-router-dom';

import {
    AnalyticsRounded,
    RestaurantMenuRounded,
    StorefrontRounded,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';

import { restaurantApi } from '@api/restaurant.api';
import { EmptyState, ErrorState } from '@components';
import { formatDate } from '@utils';

export const MyRestaurantsPage = () => {
    const navigate = useNavigate();

    const { useGetMyRestaurantsQuery } = restaurantApi;

    const {
        data: restaurants,
        isLoading,
        error,
        refetch,
    } = useGetMyRestaurantsQuery();

    const handleRetry = () => {
        void refetch();
    };

    const handleRegisterClick = () => {
        void navigate('/my-restaurants/new');
    };

    const handleMenuClick = (restaurantId: number) => () => {
        void navigate(`/my-restaurants/${restaurantId}/menu`);
    };

    const handleAnalyticsClick = (restaurantId: number) => () => {
        void navigate(`/my-restaurants/${restaurantId}/analytics`);
    };

    if (error) {
        return <ErrorState actionLabel='Retry' onActionClick={handleRetry} />;
    }

    return (
        <Stack gap={7} px={{ xs: 2, md: 4 }} py={4}>
            <Stack gap={1}>
                <Typography variant='h3'>My Restaurants</Typography>
                <Typography variant='body1' color='text.secondary'>
                    Manage your restaurant menus and view performance analytics.
                </Typography>
            </Stack>

            {isLoading ? (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(320px, 1fr))'
                    gap={4}
                >
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} variant='rounded' height={180} />
                    ))}
                </Box>
            ) : restaurants?.length === 0 ? (
                <EmptyState
                    title='No Restaurants Found'
                    description="You haven't registered any restaurants yet to manage."
                    actionLabel='Register Restaurant'
                    onActionClick={handleRegisterClick}
                />
            ) : (
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(auto-fill, minmax(320px, 1fr))'
                    gap={4}
                >
                    {restaurants?.map((restaurant) => (
                        <Card
                            key={restaurant.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3,
                                    flexGrow: 1,
                                    p: 3,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Stack
                                    direction='row'
                                    gap={2}
                                    alignItems='flex-start'
                                >
                                    <Stack
                                        p={1.5}
                                        borderRadius={2}
                                        bgcolor='primary.main'
                                        color='primary.contrastText'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <StorefrontRounded fontSize='medium' />
                                    </Stack>

                                    <Stack flex={1} gap={0.5}>
                                        <Typography variant='h5' noWrap>
                                            {restaurant.name}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            color='text.secondary'
                                        >
                                            Added on{' '}
                                            {formatDate(restaurant.created_at)}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction={{ sm: 'row' }} gap={2}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        fullWidth
                                        startIcon={<RestaurantMenuRounded />}
                                        onClick={handleMenuClick(restaurant.id)}
                                    >
                                        Menu
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        fullWidth
                                        startIcon={<AnalyticsRounded />}
                                        onClick={handleAnalyticsClick(
                                            restaurant.id,
                                        )}
                                    >
                                        Analytics
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Stack>
    );
};
