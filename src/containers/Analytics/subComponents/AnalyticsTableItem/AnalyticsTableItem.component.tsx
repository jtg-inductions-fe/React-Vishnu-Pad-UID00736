import { Stack, Tooltip, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { AnalyticsTableItemProps } from './AnalyticsTableItem.types';

export const AnalyticsTableItem = ({
    title,
    subtitle,
    value,
    tooltip,
}: AnalyticsTableItemProps) => {
    const valueElement = (
        <Typography
            variant='subtitle2'
            color='primary.main'
            sx={{ cursor: tooltip ? 'pointer' : 'default' }}
        >
            {value}
        </Typography>
    );

    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            p={1}
            alignItems='center'
        >
            <Stack gap={0.2}>
                <Typography variant='subtitle2' fontWeight={FONT_WEIGHT.BOLD}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant='caption' color='text.secondary'>
                        {subtitle}
                    </Typography>
                )}
            </Stack>

            {tooltip ? (
                <Tooltip title={tooltip} arrow placement='top'>
                    {valueElement}
                </Tooltip>
            ) : (
                valueElement
            )}
        </Stack>
    );
};
