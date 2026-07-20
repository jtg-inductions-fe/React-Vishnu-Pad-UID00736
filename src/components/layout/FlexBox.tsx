import type { CSSProperties } from 'react';

import { styled } from '@mui/material/styles';

/** Props for configuring the FlexBox layout properties */
interface FlexBoxProps {
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    gap?: number;
    direction?: CSSProperties['flexDirection'];
}

/** Reusable flex container with default center alignment and configurable spacing */
export const FlexBox = styled('div')<FlexBoxProps>(
    ({
        theme,
        justify = 'flex-start',
        align = 'center',
        gap = 0,
        direction = 'row',
    }) => ({
        ...theme.mixins.flexLayout(justify, align),
        flexDirection: direction,
        gap: theme.spacing(gap),
    }),
);
