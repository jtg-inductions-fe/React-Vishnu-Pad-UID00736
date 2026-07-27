import { Box } from '@mui/material';

import { ImageProps } from './Image.types';

export const Image = ({
    src,
    alt,
    width,
    height,
    objectFit = 'cover',
    loading = 'lazy',
    onClick,
    sx,
    ...rest
}: ImageProps) => (
    <Box
        component='img'
        src={src}
        alt={alt}
        loading={loading}
        onClick={onClick}
        sx={{
            display: 'block',
            width: width,
            height: height,
            objectFit: objectFit,
            cursor: onClick ? 'pointer' : 'default',
            ...sx,
        }}
        {...rest}
    />
);
