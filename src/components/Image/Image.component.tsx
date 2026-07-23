<<<<<<< HEAD
import { styled } from '@mui/material';

import { ImageProps, StyledImageProps } from './Image.types';

=======
import { styled } from '@mui/material/styles';

import { ImageProps } from './Image.types';
import { StyledImageProps } from './Image.types';

<<<<<<< HEAD
/** Styled image component that filters custom props from the DOM element */
>>>>>>> 370f94e (will continue)
=======
>>>>>>> a0c8a11 ([VP_A3_02]: fixed and synced)
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

/**
 * Displays a reusable image throughout the application.
 */
export const Image = ({
    src,
    alt,
    width,
    height,
    objectFit = 'cover',
    loading = 'lazy',
    onClick,
}: ImageProps) => (
    <StyledImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit={objectFit}
        loading={loading}
        clickable={Boolean(onClick)}
        onClick={onClick}
    />
);
