import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { LoginFormData } from '@type';

export interface LoginFormProps {
    register: UseFormRegister<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    isLoading: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}
