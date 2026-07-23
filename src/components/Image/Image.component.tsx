import { StyledImage } from './Image.styles';
import { ImageProps } from './Image.types';

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
