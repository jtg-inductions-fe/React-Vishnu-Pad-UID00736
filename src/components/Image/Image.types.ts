export interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    objectFit?: React.CSSProperties['objectFit'];
    loading?: 'lazy' | 'eager';
    onClick?: () => void;
}
