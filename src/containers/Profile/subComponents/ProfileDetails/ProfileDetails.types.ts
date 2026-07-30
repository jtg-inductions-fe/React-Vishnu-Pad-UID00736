import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { User } from '@type';
import { ProfileFormData } from '@validations/profile.validation';

export interface ProfileDetailsProps {
    user: User;
    isEditing: boolean;
    isUpdating: boolean;
    register: UseFormRegister<ProfileFormData>;
    errors: FieldErrors<ProfileFormData>;
    isDisabled?: boolean;
    onEnableEdit: () => void;
    onCancelEdit: () => void;
    onSubmitForm: React.FormEventHandler<HTMLFormElement>;
}
