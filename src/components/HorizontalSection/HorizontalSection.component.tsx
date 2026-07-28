import { Children, useEffect, useRef, useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { HorizontalSectionProps } from './HorizontalSection.types';
import { ScrollButton } from './subComponent';

const SCROLL_AMOUNT = 320;

export const HorizontalSection = ({
    title,
    onViewAll,
    children,
}: HorizontalSectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [children]);

    const scrollBy = (direction: 'left' | 'right') => {
        scrollRef.current?.scrollBy({
            left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
            behavior: 'smooth',
        });
    };

    const handleScrollLeft = () => scrollBy('left');
    const handleScrollRight = () => scrollBy('right');

    return (
        <Stack gap={2}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                gap={2}
            >
                <Typography variant='h5' fontWeight={FONT_WEIGHT.BOLD}>
                    {title}
                </Typography>

                {onViewAll && Children.count(children) > 0 && (
                    <Button variant='text' color='primary' onClick={onViewAll}>
                        View All
                    </Button>
                )}
            </Stack>

            <Box position='relative'>
                {canScrollLeft && (
                    <ScrollButton
                        direction='left'
                        onClick={handleScrollLeft}
                        title={title}
                    />
                )}

                {canScrollRight && (
                    <ScrollButton
                        direction='right'
                        onClick={handleScrollRight}
                        title={title}
                    />
                )}

                <Stack
                    ref={scrollRef}
                    direction='row'
                    gap={3}
                    pb={1}
                    overflow='auto'
                    sx={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                        '& > *': { scrollSnapAlign: 'start' },
                    }}
                >
                    {children}
                </Stack>
            </Box>
        </Stack>
    );
};
