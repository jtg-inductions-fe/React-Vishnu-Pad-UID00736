import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

const AppLayout = () => (
    <>
        <Header />
        <Container maxWidth="lg">
            <Outlet />
        </Container>
    </>
);

export default AppLayout;
