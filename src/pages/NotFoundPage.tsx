import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { Button, Stack, Typography } from '@mui/material';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack
            component="main"
            minHeight="100vh"
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
                textAlign: 'center',
                p: 3,
            }}
        >
            <Typography variant="displayLarge" color="primary.main">
                404
            </Typography>

            <Typography variant="h3">Lost in Deep Space</Typography>

            <Typography
                variant="body2"
                maxWidth={{ xs: '80%', sm: '40%' }}
                sx={{ mb: 2 }}
            >
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable. Let&apos;s get you
                back to familiar territory.
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={() => void navigate(ROUTES.HOME)}
            >
                Back to Home
            </Button>
        </Stack>
    );
};

export default NotFound;
