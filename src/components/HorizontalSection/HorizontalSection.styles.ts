import { Box, IconButton, styled } from '@mui/material';

export const OverlayBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'direction',
})<{ direction: 'left' | 'right' }>(({ direction }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 48,
    zIndex: 1,
    left: direction === 'left' ? 0 : 'auto',
    right: direction === 'right' ? 0 : 'auto',
}));

export const StyledIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'direction',
})<{ direction: 'left' | 'right' }>(({ theme, direction }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
    left: direction === 'left' ? 4 : 'auto',
    right: direction === 'right' ? 4 : 'auto',
}));
