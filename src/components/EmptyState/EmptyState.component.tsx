import { SearchOffRounded } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { EmptyStateProps } from './EmptyState.types';

export const EmptyState = ({
    title,
    description,
    actionLabel,
    onActionClick,
    icon,
}: EmptyStateProps) => (
    <Stack
        alignItems='center'
        justifyContent='center'
        minHeight='50vh'
        gap={2}
        textAlign='center'
        px={2}
    >
        {icon || (
            <SearchOffRounded sx={{ fontSize: 80, color: 'text.disabled' }} />
        )}

        <Typography
            variant='h5'
            fontWeight={FONT_WEIGHT.BOLD}
            color='text.primary'
        >
            {title}
        </Typography>

        <Typography variant='body1' color='text.secondary' maxWidth={400}>
            {description}
        </Typography>

        {actionLabel && onActionClick && (
            <Button
                variant='contained'
                color='primary'
                onClick={onActionClick}
                sx={{ mt: 2 }}
            >
                {actionLabel}
            </Button>
        )}
    </Stack>
);
