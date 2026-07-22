import { Header } from 'containers';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import { AuthWrapper } from './AuthWrapper';

const AppLayout = () => (
    <AuthWrapper>
        <Header />
        <Container maxWidth="lg">
            <Outlet />
        </Container>
    </AuthWrapper>
);

export default AppLayout;
