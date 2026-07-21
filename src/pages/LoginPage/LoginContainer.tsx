import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

import { zodResolver } from '@hookform/resolvers/zod';

import { LoginPage } from './LoginPage';
import { useLoginMutation } from '../../api/authApi';
import { setCredentials } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { getErrorMessage } from '../../utils/errorHandler';
import { LoginFormData, loginSchema } from '../../validations/auth.schema';

export const LoginContainer = () => {
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
        <LoginPage
            register={register}
            errors={errors}
            isLoading={isLoading}
            onSubmit={onSubmitHandler}
        />
    );
};
