import { styled } from '@mui/material/styles';

/** Props for configuring image dimensions and click behavior */
interface StyledImageProps {
    width?: string;
    height?: string;
    objectFit?: React.CSSProperties['objectFit'];
    clickable?: boolean;
}

/** Styled image component that filters custom props from the DOM element */
export const StyledImage = styled('img', {
    shouldForwardProp: (prop) =>
        !['width', 'height', 'objectFit', 'clickable'].includes(prop as string),
})<StyledImageProps>(({ width, height, objectFit, clickable }) => ({
    display: 'block',
    width,
    height,
    objectFit,
    cursor: clickable ? 'pointer' : 'default',
}));
