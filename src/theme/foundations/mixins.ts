import type {
    CSSProperties,
    MixinsOptions,
} from '@mui/material/styles/createMixins';

/** Truncates text after the specified number of lines. */
const lineClamp = (lines: number = 1): CSSProperties => ({
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
});

/**
 * Dynamic Flexbox Mixin
 * Default behavior is a standard row with center alignment.
 */
const flexLayout = (
    justify: CSSProperties['justifyContent'] = 'flex-start',
    align: CSSProperties['alignItems'] = 'center',
    direction: CSSProperties['flexDirection'] = 'row',
): CSSProperties => ({
    display: 'flex',
    justifyContent: justify,
    alignItems: align,
    flexDirection: direction,
});

export const mixins: MixinsOptions = {
    lineClamp,
    flexLayout,
};
