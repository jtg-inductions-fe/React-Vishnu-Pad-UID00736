import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { Button, Link, Stack, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../layouts/AuthLayout';
import { RegisterFormData } from '../../validations/auth.schema';

interface RegisterFormProps {
    register: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
}

export const RegisterPage = ({
    register,
    errors,
    onSubmit,
    isLoading,
}: RegisterFormProps) => (
    <AuthLayout onSubmit={onSubmit} maxWidth="50rem">
        <Typography variant="h3" align="center" mb={2}>
            Create Account
        </Typography>

        <TextField
            label="Full Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message || ''}
        />

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

        <Stack direction="row" spacing={2}>
            <TextField
                label="City"
                {...register('city')}
                error={!!errors.city}
                helperText={errors.city?.message || ''}
            />
            <TextField
                label="State"
                {...register('state')}
                error={!!errors.state}
                helperText={errors.state?.message || ''}
            />
        </Stack>

        <TextField
            label="Zipcode"
            {...register('zipcode')}
            error={!!errors.zipcode}
            helperText={errors.zipcode?.message || ''}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
        </Button>

        <Typography variant="body2" align="center" mt={2}>
            Already have an account?{' '}
            <Link
                component={RouterLink}
                to={ROUTES.LOGIN}
                variant="subtitle2"
                underline="hover"
            >
                Login here
            </Link>
        </Typography>
    </AuthLayout>
);
