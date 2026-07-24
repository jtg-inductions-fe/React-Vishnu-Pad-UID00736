import { useNavigate } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import { ROUTES } from '@constant';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack
            component='main'
            minHeight='100vh'
            justifyContent='center'
            alignItems='center'
            gap={1}
            sx={{
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography
                variant='h1'
                color='primary.main'
                sx={{
                    fontSize: { xs: 70, md: 80 },
                    mb: 2,
                }}
            >
                404
            </Typography>

            <Typography variant='h3'>Lost in Deep Space</Typography>

            <Typography
                variant='body2'
                maxWidth={{ xs: '80%', sm: '40%' }}
                sx={{ mb: 8, mt: 1 }}
            >
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable. Let&apos;s get you
                back to familiar territory.
            </Typography>

            <Button
                variant='contained'
                size='large'
                onClick={() => void navigate(ROUTES.HOME)}
            >
                Back to Home
            </Button>
        </Stack>
    );
};

export default NotFound;
