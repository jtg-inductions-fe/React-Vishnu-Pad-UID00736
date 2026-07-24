import { SxProps, Theme } from '@mui/material/styles';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
    objectFit?: React.CSSProperties['objectFit'];
    loading?: 'lazy' | 'eager';
    onClick?: () => void;
    sx?: SxProps<Theme>;
}

export interface StyledImageProps {
    width?: string | number;
    height?: string | number;
    objectFit?: React.CSSProperties['objectFit'];
    clickable?: boolean;
}
