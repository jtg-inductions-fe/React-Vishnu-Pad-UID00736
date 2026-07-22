import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { Button, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginFormData } from '../../validations/auth.schema';

interface LoginFormProps {
    register: UseFormRegister<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
}

export const LoginPage = ({
    register,
    errors,
    onSubmit,
    isLoading,
}: LoginFormProps) => (
    <AuthLayout onSubmit={onSubmit} maxWidth="40rem">
        <Typography variant="h3" align="center" mb={2}>
            Login
        </Typography>

        <TextField
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message || ''}
        />

        <TextField
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message || ''}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Typography variant="body2" align="center" mt={2}>
            Don&apos;t have an account?{' '}
            <Link
                component={RouterLink}
                to={ROUTES.REGISTER}
                variant="subtitle2"
                underline="hover"
            >
                Register here
            </Link>
        </Typography>
    </AuthLayout>
);
