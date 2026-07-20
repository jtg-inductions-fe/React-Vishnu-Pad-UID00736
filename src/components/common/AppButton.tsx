import { Button as MuiButton, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FONT_WEIGHT } from '@constant';

const StyledButton = styled(MuiButton)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.shape.borderRadius * 2,
    fontWeight: FONT_WEIGHT.MEDIUM,
    boxShadow: theme.shadows[3],
    textTransform: 'none',
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));

/**
 * A custom button for the app based on Material UI.
 * It has some default styles applied like rounded corners,
 * shadows, and custom padding.
 */
export const AppButton = (props: ButtonProps) => <StyledButton {...props} />;
