import { ReactNode } from 'react';

import { Box, Card, Stack } from '@mui/material';

interface AuthLayoutProps {
    children: ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    maxWidth?: string;
}

export const AuthLayout = ({
    children,
    onSubmit,
    maxWidth = '40rem',
}: AuthLayoutProps) => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 8rem)"
        p={2}
    >
        <Box width="100%" maxWidth={maxWidth}>
            <Card>
                <Stack component="form" onSubmit={onSubmit} spacing={2} p={4}>
                    {children}
                </Stack>
            </Card>
        </Box>
    </Box>
);
