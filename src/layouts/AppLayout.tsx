import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

const AppLayout = () => (
    <Container maxWidth="lg">
        <Outlet />
    </Container>
);

export default AppLayout;
