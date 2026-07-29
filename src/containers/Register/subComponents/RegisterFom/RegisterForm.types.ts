import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { RegisterFormData } from '@type';

export interface RegisterFormProps {
    register: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    isLoading: boolean;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}
