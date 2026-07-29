import React from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@api/auth.api';
import { ROUTES } from '@constant/routes.constants';
import { RegisterFormData } from '@type';
import { getErrorMessage } from '@utils';

import { RegisterForm } from './subComponents';

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
        <RegisterForm
            register={register}
            errors={errors}
            isLoading={isLoading}
            onSubmit={onSubmitHandler}
        />
    );
};
