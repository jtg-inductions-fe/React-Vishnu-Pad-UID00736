import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RegisterFormData, registerSchema } from 'validations/auth.schema';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { useRegisterMutation } from '@api/auth.api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from '@layouts/Auth.layout';
import { ROUTES } from '@routes/routes.constants';
import { getErrorMessage } from '@utils';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterMutation();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            city: '',
            state: '',
            zipcode: '',
            balance: 0,
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
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message || ''}
                />

                <TextField
                    label='Email'
                    type='email'
                    fullWidth
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message || ''}
                />

                <TextField
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message || ''}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Stack direction={{ sm: 'row' }} gap={2}>
                    <TextField
                        label='City'
                        fullWidth
                        {...register('city')}
                        error={!!errors.city}
                        helperText={errors.city?.message || ''}
                    />
                    <TextField
                        label='State'
                        fullWidth
                        {...register('state')}
                        error={!!errors.state}
                        helperText={errors.state?.message || ''}
                    />
                </Stack>

                <Stack direction={{ sm: 'row' }} gap={2}>
                    <TextField
                        label='Zipcode'
                        fullWidth
                        {...register('zipcode')}
                        error={!!errors.zipcode}
                        helperText={errors.zipcode?.message || ''}
                    />

                    <TextField
                        label='Balance'
                        type='number'
                        fullWidth
                        {...register('balance', { valueAsNumber: true })}
                        error={!!errors.balance}
                        helperText={errors.balance?.message || ''}
                    />
                </Stack>

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
