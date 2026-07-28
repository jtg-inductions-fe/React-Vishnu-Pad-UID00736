import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';

import { OverlayBox, StyledIconButton } from '../HorizontalSection.styles';

export const ScrollButton = ({
    direction,
    onClick,
    title,
}: {
    direction: 'left' | 'right';
    onClick: () => void;
    title: string;
}) => (
    <>
        <OverlayBox direction={direction} />
        <StyledIconButton
            direction={direction}
            onClick={onClick}
            aria-label={`Scroll ${title} ${direction}`}
        >
            {direction === 'left' ? (
                <ChevronLeftRounded />
            ) : (
                <ChevronRightRounded />
            )}
        </StyledIconButton>
    </>
);
