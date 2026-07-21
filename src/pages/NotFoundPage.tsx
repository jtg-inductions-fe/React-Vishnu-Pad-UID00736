import { CenteredPageWrapper } from 'components/layout/CenteredPageWrapper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { Button, Typography } from '@mui/material';

/**
 * Displays the application's 404 page.
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <CenteredPageWrapper>
            <Typography variant="displayLarge" color="primary.main" mb={2}>
                404
            </Typography>

            <Typography variant="h3" mb={2}>
                Lost in Deep Space
            </Typography>

            <Typography
                variant="body2"
                maxWidth={{ xs: '80%', sm: '40%' }}
                mx="auto"
                mb={4}
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
        </CenteredPageWrapper>
    );
};

export default NotFound;
