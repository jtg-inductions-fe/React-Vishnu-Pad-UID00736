import type {
    CSSProperties,
    MixinsOptions,
} from '@mui/material/styles/createMixins';

/**
 * A handy tool to cut off long text after a certain number of lines.
 * If the text is too long, it hides the extra part and adds three dots (...) at the end.
 * By default, it limits the text to just 1 line unless you specify a different number.
 */
const lineClamp = (lines: number = 1): CSSProperties => ({
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
});

/**
 * We pack our custom styling tools (like lineClamp) into this mixins object.
 * This allows us to easily reuse these styles anywhere in our Material UI theme.
 */
export const mixins: MixinsOptions = {
    lineClamp,
};
