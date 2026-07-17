import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const NotFoundWrapper = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    padding: theme.spacing(3),
}));

export const ErrorCode = styled(Typography)(({ theme }) => ({
    fontSize: '6rem',
    fontWeight: 800,
    color: theme.palette.primary.main,
    letterSpacing: '-0.05em',
    lineHeight: 1,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        fontSize: '10rem',
    },
}));

export const SubHeading = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
}));

export const Description = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.shape.borderRadius * 2,
    fontWeight: 600,
    boxShadow: theme.shadows[3],
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));
