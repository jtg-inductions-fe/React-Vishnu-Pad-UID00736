import { UseFormRegisterReturn } from 'react-hook-form';

import { TextFieldProps } from '@mui/material';

export type PasswordInputProps = Omit<TextFieldProps, 'type'> & {
    registration: UseFormRegisterReturn;
};
