import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getErrorMessage } from 'utils/errorHandler';
import { LoginFormData, loginSchema } from 'validations/auth.schema';

import { Button, Link, Stack, TextField, Typography } from '@mui/material';

import { useLoginMutation } from '@api/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@layouts/Auth.layout';
import { ROUTES } from '@routes/routes.constants';
import { useAppDispatch } from '@store/hooks';
import { setCredentials } from '@store/slices';

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginUser, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await loginUser(data).unwrap();
            dispatch(setCredentials({ user: response, token: response.token }));
            toast.success('Login Successful! Welcome back.');
            void navigate(ROUTES.HOME);
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
        }
    };

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        void handleSubmit(onSubmit)(e);
    };

    return (
        <AuthLayout onSubmit={onSubmitHandler} maxWidth="50rem">
            <Typography variant="h3" align="center" mb={4} p={4}>
                Login
            </Typography>

            <Stack spacing={4}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message || ''}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message || ''}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 4 }}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
            </Stack>

            <Typography variant="body2" align="center" mt={6}>
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
};
