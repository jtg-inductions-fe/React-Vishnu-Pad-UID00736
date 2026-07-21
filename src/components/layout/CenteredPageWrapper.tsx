import { styled } from '@mui/material/styles';

/**
 * Provides a centered layout for full-page states.
 */
export const CenteredPageWrapper = styled('main')(({ theme }) => ({
    minHeight: '100vh',
    ...theme.mixins.flexLayout('center', 'center', 'column'),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    padding: theme.spacing(3),
}));
