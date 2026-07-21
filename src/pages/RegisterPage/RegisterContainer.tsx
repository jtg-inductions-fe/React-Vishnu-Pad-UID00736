import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterPage } from './RegisterPage';
import { useRegisterMutation } from '../../api/authApi';
import { getErrorMessage } from '../../utils/errorHandler';
import {
    RegisterFormData,
    registerSchema,
} from '../../validations/auth.schema';

export const RegisterContainer = () => {
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterMutation();

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
        <RegisterPage
            register={register}
            errors={errors}
            isLoading={isLoading}
            onSubmit={onSubmitHandler}
        />
    );
};
