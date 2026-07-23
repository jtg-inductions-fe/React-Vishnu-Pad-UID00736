import { ReactNode } from 'react';

// useTheme import kiya
import { Box, Card, Stack, useTheme } from '@mui/material';

interface AuthLayoutProps {
    children: ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    // Type ko string | number kar diya taaki MUI spacing number pass kar sakein
    maxWidth?: string | number;
}

export const AuthLayout = ({
    children,
    onSubmit,
    maxWidth = 100,
}: AuthLayoutProps) => {
    const theme = useTheme();

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            minHeight={`calc(100vh - ${theme.spacing(20)})`}
            p={2}
        >
            <Box
                width='100%'
                maxWidth={
                    typeof maxWidth === 'number'
                        ? theme.spacing(maxWidth)
                        : maxWidth
                }
            >
                <Card>
                    <Stack component='form' onSubmit={onSubmit} gap={1} p={4}>
                        {children}
                    </Stack>
                </Card>
            </Box>
        </Box>
    );
};
