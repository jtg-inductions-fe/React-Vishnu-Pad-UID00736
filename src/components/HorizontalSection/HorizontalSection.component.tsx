import { Children, useEffect, useRef, useState } from 'react';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import { FONT_WEIGHT } from '@constant';

import { HorizontalSectionProps } from './HorizontalSection.types';

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
                    <>
                        <Box
                            position='absolute'
                            left={0}
                            top={0}
                            bottom={0}
                            width={48}
                            zIndex={1}
                        />
                        <IconButton
                            onClick={handleScrollLeft}
                            aria-label={`Scroll ${title} left`}
                            sx={{
                                position: 'absolute',
                                left: 4,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 2,
                                '&:hover': { bgcolor: 'background.paper' },
                            }}
                        >
                            <ChevronLeftRoundedIcon />
                        </IconButton>
                    </>
                )}

                {canScrollRight && (
                    <>
                        <Box
                            position='absolute'
                            right={0}
                            top={0}
                            bottom={0}
                            width={48}
                            zIndex={1}
                        />
                        <IconButton
                            onClick={handleScrollRight}
                            aria-label={`Scroll ${title} right`}
                            sx={{
                                position: 'absolute',
                                right: 4,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 2,
                                '&:hover': { bgcolor: 'background.paper' },
                            }}
                        >
                            <ChevronRightRoundedIcon />
                        </IconButton>
                    </>
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
