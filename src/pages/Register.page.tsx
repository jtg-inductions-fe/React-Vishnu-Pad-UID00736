import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registerRules } from 'validations/auth.validation';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';

import { authApi } from '@api/auth.api';
import { ROUTES } from '@constant/routes.constants';
import { AuthLayout } from '@layouts/Auth.layout';
import { RegisterFormData } from '@type';
import { getErrorMessage } from '@utils';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { useRegisterMutation } = authApi;

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

                <TextField
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register('password', registerRules.password)}
                    error={!!errors.password}
                    helperText={errors.password?.message || ''}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Tooltip
                                        title={
                                            showPassword
                                                ? 'Hide Password'
                                                : 'Show Password'
                                        }
                                        arrow
                                    >
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge='end'
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        },
                    }}
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

                <Stack direction={{ sm: 'row' }} gap={2}>
                    <TextField
                        label='Zipcode'
                        fullWidth
                        {...register('zipcode', registerRules.zipcode)}
                        error={!!errors.zipcode}
                        helperText={errors.zipcode?.message || ''}
                    />

                    <TextField
                        label='Balance'
                        type='number'
                        fullWidth
                        {...register('balance', registerRules.balance)}
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
