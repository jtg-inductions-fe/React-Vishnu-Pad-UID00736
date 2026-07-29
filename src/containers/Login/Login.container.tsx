import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@api/auth.api';
import { ROUTES } from '@constant';
import { useAppDispatch } from '@store/hooks';
import { setCredentials } from '@store/slices';
import { LoginFormData } from '@type';
import { getErrorMessage } from '@utils';

import { LoginForm } from './subComponents/LoginForm';

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
        <LoginForm
            register={register}
            errors={errors}
            isLoading={isLoading}
            onSubmit={onSubmitHandler}
        />
    );
};
