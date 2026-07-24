import { Button, Stack, Typography, useTheme } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { ErrorStateProps } from './ErrorState.types';

export const ErrorState = ({
    title = 'Something went wrong',
    description = "We couldn't load this page. Please try again in a moment.",
    actionLabel,
    onActionClick,
}: ErrorStateProps) => {
    const theme = useTheme();

    return (
        <Stack
            alignItems='center'
            justifyContent='center'
            minHeight={`calc(100vh - ${theme.spacing(8)})`}
            gap={theme.spacing(2)}
            py={theme.spacing(10)}
            textAlign='center'
        >
            <Typography
                variant='h4'
                fontWeight={FONT_WEIGHT.BOLD}
                color='error.main'
            >
                {title}
            </Typography>

            <Typography variant='body1' color='text.secondary' maxWidth={400}>
                {description}
            </Typography>

            {actionLabel && onActionClick && (
                <Button variant='contained' onClick={onActionClick}>
                    {actionLabel}
                </Button>
            )}
        </Stack>
    );
};
