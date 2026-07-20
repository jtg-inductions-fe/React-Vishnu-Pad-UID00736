import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * A wrapper container that takes up the full screen height
 * and centers everything inside it right in the middle.
 */
export const CenteredPageWrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    padding: theme.spacing(3),
}));
