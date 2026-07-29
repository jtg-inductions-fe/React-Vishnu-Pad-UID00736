import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registerRules } from 'validations/auth.validation';

import { Button, Link, Stack, TextField, Typography } from '@mui/material';

import { authApi } from '@api/auth.api';
import { PasswordInput } from '@components';
import { ROUTES } from '@constant/routes.constants';
import { AuthLayout } from '@layouts/Auth.layout';
import { RegisterFormData } from '@type';
import { getErrorMessage } from '@utils';

export const RegisterContainer = () => {
    const navigate = useNavigate();
    const { useRegisterMutation } = authApi;

    const [registerUser, { isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            city: '',
            state: '',
            zipcode: '',
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data).unwrap();
            toast.success('Account created successfully! Please login.');
            void navigate(ROUTES.LOGIN);
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
                Create Account
            </Typography>

            <Stack gap={4}>
                <TextField
                    label='Full Name'
                    fullWidth
                    {...register('name', registerRules.name)}
                    error={!!errors.name}
                    helperText={errors.name?.message || ''}
                />

                <TextField
                    label='Email'
                    type='email'
                    fullWidth
                    {...register('email', registerRules.email)}
                    error={!!errors.email}
                    helperText={errors.email?.message || ''}
                />

                <PasswordInput
                    label='Password'
                    fullWidth
                    registration={register('password', registerRules.password)}
                    error={!!errors.password}
                    helperText={errors.password?.message || ''}
                />

                <Stack direction={{ sm: 'row' }} gap={2}>
                    <TextField
                        label='City'
                        fullWidth
                        {...register('city', registerRules.city)}
                        error={!!errors.city}
                        helperText={errors.city?.message || ''}
                    />
                    <TextField
                        label='State'
                        fullWidth
                        {...register('state', registerRules.state)}
                        error={!!errors.state}
                        helperText={errors.state?.message || ''}
                    />
                </Stack>

                <TextField
                    label='Zipcode'
                    fullWidth
                    {...register('zipcode', registerRules.zipcode)}
                    error={!!errors.zipcode}
                    helperText={errors.zipcode?.message || ''}
                />

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 4 }}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </Button>
            </Stack>

            <Typography variant='body2' align='center' mt={6}>
                Already have an account?{' '}
                <Link
                    component={RouterLink}
                    to={ROUTES.LOGIN}
                    variant='subtitle2'
                    underline='hover'
                >
                    Login here
                </Link>
            </Typography>
        </AuthLayout>
    );
};
