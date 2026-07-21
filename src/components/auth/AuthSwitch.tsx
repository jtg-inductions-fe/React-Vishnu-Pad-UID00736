import { useNavigate } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

interface AuthSwitchProps {
    text: string;
    linkText: string;
    route: string;
}

export const AuthSwitch = ({ text, linkText, route }: AuthSwitchProps) => {
    const navigate = useNavigate();

    return (
        <Typography variant="body2" align="center" mt={2}>
            {text}{' '}
            <Link
                component="button"
                type="button"
                variant="subtitle2"
                color="primary.main"
                underline="hover"
                onClick={() => void navigate(route)}
            >
                {linkText}
            </Link>
        </Typography>
    );
};
