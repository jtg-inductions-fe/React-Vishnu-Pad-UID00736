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

export const mixins: MixinsOptions = {
    lineClamp,
};
