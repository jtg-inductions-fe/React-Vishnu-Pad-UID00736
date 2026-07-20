import { AppButton } from 'components/common/AppButton';
import { CenteredPageWrapper } from 'components/common/PageStates';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

/**
 * The 404 Error page.
 * This screen shows up when a user tries to visit a URL that doesn't exist in our app.
 * It shows a "Lost in Deep Space" message and a button to go back home.
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <CenteredPageWrapper>
            <Typography
                variant="h1"
                color="primary.main"
                fontSize={{ xs: '6rem', md: '10rem' }}
                fontWeight={FONT_WEIGHT.BOLD}
                lineHeight={1}
                mb={2}
            >
                404
            </Typography>

            <Typography
                variant="h3"
                color="text.primary"
                fontWeight={FONT_WEIGHT.BOLD}
                mb={2}
            >
                Lost in Deep Space
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                maxWidth="80%"
                mx="auto"
                mb={4}
            >
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable. Let&apos;s get you
                back to familiar territory.
            </Typography>

            <AppButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => void navigate(ROUTES.HOME)}
            >
                Back to Home
            </AppButton>
        </CenteredPageWrapper>
    );
};

export default NotFound;
