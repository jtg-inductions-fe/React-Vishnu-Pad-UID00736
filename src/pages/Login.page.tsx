import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginRules } from 'validations/auth.validation';

import { Visibility, VisibilityOff } from '@mui/icons-material';
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

import { ROUTES } from '@constant';
import { AuthLayout } from '@layouts/Auth.layout';
import { useAuthService } from '@services';
import { useAppDispatch } from '@store/hooks';
import { setCredentials } from '@store/slices';
import { LoginFormData } from '@type';
import { getErrorMessage } from '@utils';

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { login: loginUser, isLoginLoading: isLoading } = useAuthService();

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

                <TextField
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register('password', loginRules.password)}
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
