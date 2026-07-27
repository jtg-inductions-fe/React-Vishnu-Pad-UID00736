import { Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { InfoRowProps } from './InfoRow.types';

export const InfoRow = ({ label, value }: InfoRowProps) => (
    <Stack gap={0.5}>
        <Typography
            variant='caption'
            color='text.secondary'
            textTransform='uppercase'
            fontWeight={FONT_WEIGHT.MEDIUM}
        >
            {label}
        </Typography>
        <Typography variant='body1' fontWeight={FONT_WEIGHT.REGULAR}>
            {value || '—'}
        </Typography>
    </Stack>
);
