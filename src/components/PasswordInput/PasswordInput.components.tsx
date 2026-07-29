import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';

import { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = ({
    registration,
    error,
    helperText,
    label = 'Password',
    ...rest
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    return (
        <TextField
            label={label}
            type={showPassword ? 'text' : 'password'}
            error={error}
            helperText={helperText}
            {...registration}
            {...rest}
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
                                    onMouseDown={handleMouseDownPassword}
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
    );
};
