import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ROUTES } from 'routes/constants';

import { Button, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthSwitch } from '../../components/auth/AuthSwitch';
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

        <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
        >
            {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <AuthSwitch
            text="Don't have an account?"
            linkText="Register here"
            route={ROUTES.REGISTER}
        />
    </AuthLayout>
);
