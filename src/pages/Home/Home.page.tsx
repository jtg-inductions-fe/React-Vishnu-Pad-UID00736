import { useNavigate } from 'react-router-dom';

import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { hero } from '@assets/images';
import { COLORS, FONT_WEIGHT, ROUTES } from '@constant';
import { MenuListContainer, RestaurantListContainer } from '@containers';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleExploreRestaurants = () => {
        void navigate(ROUTES.RESTAURANTS);
    };

    const handleViewMenu = () => {
        void navigate(ROUTES.MENU);
    };

    return (
        <Stack gap={8}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 6,
                    height: {
                        xs: 320,
                        md: 480,
                    },
                }}
            >
                <Box
                    component='img'
                    src={hero}
                    alt='Fresh Food'
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(
                            90deg,
                            ${alpha(COLORS.SECONDARY.DARK, 0.92)} 0%,
                            ${alpha(COLORS.SECONDARY.DARK, 0.72)} 45%,
                            ${alpha(COLORS.SECONDARY.DARK, 0.35)} 100%
                        )`,
                    }}
                />

                <Stack
                    gap={2}
                    justifyContent='center'
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        px: {
                            xs: 4,
                            md: 10,
                        },
                        maxWidth: FONT_WEIGHT.BOLD,
                    }}
                >
                    <Typography variant='subtitle2' color='primary'>
                        FRESH • FAST • DELICIOUS
                    </Typography>

                    <Typography variant='h1' color={COLORS.PRIMARY.CONTRAST}>
                        Delicious Food,
                        <br />
                        Delivered To Your Door
                    </Typography>

                    <Typography
                        variant='body1'
                        color={alpha(COLORS.PRIMARY.CONTRAST, 0.9)}
                    >
                        Explore hundreds of restaurants, discover your favourite
                        dishes, and enjoy fast, fresh delivery whenever
                        you&apos;re hungry.
                    </Typography>

                    <Stack direction='row' spacing={3} mt={2}>
                        <Button
                            variant='contained'
                            size='large'
                            onClick={handleExploreRestaurants}
                        >
                            Explore Restaurants
                        </Button>

                        <Button
                            variant='outlined'
                            color='inherit'
                            size='large'
                            onClick={handleViewMenu}
                            sx={{
                                borderColor: alpha(
                                    COLORS.PRIMARY.CONTRAST,
                                    0.4,
                                ),
                                color: COLORS.PRIMARY.CONTRAST,

                                '&:hover': {
                                    borderColor: COLORS.PRIMARY.CONTRAST,
                                    backgroundColor: alpha(
                                        COLORS.PRIMARY.CONTRAST,
                                        0.08,
                                    ),
                                },
                            }}
                        >
                            View Menu
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            <Stack gap={0.5}>
                <Typography variant='h3'>Explore Best Food</Typography>

                <Typography variant='body1' color='text.secondary'>
                    Discover top-rated restaurants and dishes near you.
                </Typography>
            </Stack>

            <RestaurantListContainer layout='horizontal' limit={10} />

            <MenuListContainer layout='horizontal' limit={10} />
        </Stack>
    );
};
