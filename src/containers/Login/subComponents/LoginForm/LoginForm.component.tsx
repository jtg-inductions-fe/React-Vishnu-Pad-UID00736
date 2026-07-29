import { Link as RouterLink } from 'react-router-dom';
import { loginRules } from 'validations/auth.validation';

import { Button, Link, Stack, TextField, Typography } from '@mui/material';

import { PasswordInput } from '@components';
import { ROUTES } from '@constant';
import { AuthLayout } from '@layouts/Auth.layout';

import { LoginFormProps } from './LoginForm.types';

export const LoginForm = ({
    register,
    errors,
    isLoading,
    onSubmit,
}: LoginFormProps) => (
    <AuthLayout onSubmit={onSubmit} maxWidth={125}>
        <Typography variant='h3' align='center' mb={4} p={4}>
            Login
        </Typography>

        <Stack gap={4}>
            <TextField
                label='Email'
                type='email'
                fullWidth
                {...register('email', loginRules.email)}
                error={!!errors.email}
                helperText={errors.email?.message || ''}
            />

            <PasswordInput
                label='Password'
                fullWidth
                registration={register('password', loginRules.password)}
                error={!!errors.password}
                helperText={errors.password?.message || ''}
            />

            <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disabled={isLoading}
                sx={{ mt: 4 }}
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
        </Stack>

        <Typography variant='body2' align='center' mt={6}>
            Don&apos;t have an account?{' '}
            <Link
                component={RouterLink}
                to={ROUTES.REGISTER}
                variant='subtitle2'
                underline='hover'
            >
                Register here
            </Link>
        </Typography>
    </AuthLayout>
);
