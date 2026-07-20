import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Provides a centered layout for full-page states.
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
