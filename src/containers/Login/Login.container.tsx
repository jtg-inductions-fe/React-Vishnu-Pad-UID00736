import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginRules } from 'validations/auth.validation';

import { Button, Link, Stack, TextField, Typography } from '@mui/material';

import { authApi } from '@api/auth.api';
import { PasswordInput } from '@components';
import { ROUTES } from '@constant';
import { AuthLayout } from '@layouts/Auth.layout';
import { useAppDispatch } from '@store/hooks';
import { setCredentials } from '@store/slices';
import { LoginFormData } from '@type';
import { getErrorMessage } from '@utils';

export const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { useLoginMutation } = authApi;
    const [loginUser, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await loginUser(data).unwrap();

            const { token, ...userData } = response;

            dispatch(
                setCredentials({
                    user: userData,
                    token: token,
                }),
            );

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
        <AuthLayout onSubmit={onSubmitHandler} maxWidth={125}>
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
};
