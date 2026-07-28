import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EditRounded } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid2,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { userApi } from '@api/user.api';
import { InfoRow } from '@components';
import {
    FONT_WEIGHT,
    FORM_EDIT_FIELDS,
    PROFILE_DISPLAY_FIELDS,
} from '@constant';
import { useAppDispatch } from '@store/hooks';
import { updateUser } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';
import {
    PROFILE_VALIDATION_RULES,
    ProfileFormData,
} from '@validations/profile.validation';

export const ProfileDetails = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const { useUpdateUserProfileMutation } = userApi;

    const [updateProfile, { isLoading: isUpdating }] =
        useUpdateUserProfileMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            city: user?.city || '',
            state: user?.state || '',
            zipcode: user?.zipcode || '',
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                city: user.city || '',
                state: user.state || '',
                zipcode: user.zipcode || '',
            });
        }
    }, [user, reset, isEditing]);

    const handleEnableEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        reset();
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        void handleSubmit(onSubmit)(e);
    };

    const onSubmit = async (data: ProfileFormData) => {
        try {
            const updatedUser = await updateProfile({
                id: user.id,
                data,
            }).unwrap();

            dispatch(updateUser(updatedUser));

            toast.success('Profile details updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Box
            p={4}
            border={1}
            borderColor='divider'
            borderRadius={3}
            bgcolor='background.paper'
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                mb={4}
            >
                <Typography variant='h6' fontWeight={FONT_WEIGHT.BOLD}>
                    Profile Information
                </Typography>
                {!isEditing && (
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        startIcon={<EditRounded />}
                        onClick={handleEnableEdit}
                    >
                        Edit Profile
                    </Button>
                )}
            </Stack>

            {!isEditing ? (
                <Stack gap={4}>
                    <Stack direction='row' gap={3} alignItems='center'>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: 'primary.main',
                                fontSize: '2rem',
                                fontWeight: FONT_WEIGHT.LIGHT,
                            }}
                        >
                            {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : 'U'}
                        </Avatar>
                        <Box>
                            <Typography
                                variant='h5'
                                fontWeight={FONT_WEIGHT.BOLD}
                            >
                                {user.name}
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                {user.email}
                            </Typography>
                        </Box>
                    </Stack>
                    <Divider />
                    <Grid2 container spacing={4}>
                        {PROFILE_DISPLAY_FIELDS.map(({ label, key }) => (
                            <Grid2 key={key} size={{ xs: 12, sm: 4 }}>
                                <InfoRow label={label} value={user[key]} />
                            </Grid2>
                        ))}
                    </Grid2>
                </Stack>
            ) : (
                <Stack component='form' onSubmit={handleFormSubmit} gap={3}>
                    <Grid2 container spacing={3}>
                        {FORM_EDIT_FIELDS.map(({ label, name, sm }) => (
                            <Grid2 key={name} size={{ xs: 12, sm }}>
                                <TextField
                                    fullWidth
                                    label={label}
                                    {...register(
                                        name,
                                        PROFILE_VALIDATION_RULES[name],
                                    )}
                                    error={!!errors[name]}
                                    helperText={errors[name]?.message}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                    <Stack
                        direction='row'
                        justifyContent='flex-end'
                        gap={2}
                        pt={2}
                    >
                        <Button
                            variant='text'
                            color='inherit'
                            size='large'
                            onClick={handleCancelEdit}
                            disabled={isUpdating}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            disabled={isUpdating}
                            disableElevation
                        >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Box>
    );
};
