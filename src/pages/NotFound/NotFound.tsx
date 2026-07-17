import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import {
    ActionButton,
    Description,
    ErrorCode,
    NotFoundWrapper,
    SubHeading,
} from './NotFound.styles';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundWrapper>
            <Container maxWidth="sm">
                <ErrorCode variant="h1">404</ErrorCode>

                <SubHeading variant="h3">Lost in Deep Space</SubHeading>

                <Description variant="body1">
                    The page you are looking for might have been removed, had
                    its name changed, or is temporarily unavailable. Let&apos;s
                    get you back to familiar territory.
                </Description>

                <ActionButton
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => void navigate('/')}
                >
                    Back to Home
                </ActionButton>
            </Container>
        </NotFoundWrapper>
    );
};

export default NotFound;
