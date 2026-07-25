import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
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

import { useUpdateUserProfileMutation } from '@api/user.api';
import { FONT_WEIGHT } from '@constant';
import { useAppDispatch } from '@store/hooks';
import { updateUser } from '@store/slices';
import { User } from '@type';
import { getErrorMessage } from '@utils';
import { updateProfileSchema } from '@validations/profile.schema';

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Stack gap={0.5}>
        <Typography
            variant='caption'
            color='text.secondary'
            textTransform='uppercase'
            fontWeight={FONT_WEIGHT.MEDIUM}
        >
            {label}
        </Typography>
        <Typography variant='body1' fontWeight={FONT_WEIGHT.REGULAR}>
            {value || '—'}
        </Typography>
    </Stack>
);

const PROFILE_DISPLAY_FIELDS = [
    { label: 'City', key: 'city' as const },
    { label: 'State', key: 'state' as const },
    { label: 'Zipcode', key: 'zipcode' as const },
];

const FORM_EDIT_FIELDS = [
    { label: 'Full Name', name: 'name', sm: 6 },
    { label: 'Email Address', name: 'email', sm: 6 },
    { label: 'City', name: 'city', sm: 4 },
    { label: 'State', name: 'state', sm: 4 },
    { label: 'Zipcode', name: 'zipcode', sm: 4 },
] as const;

export const ProfileDetails = ({ user }: { user: User }) => {
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [updateProfileApi, { isLoading: isUpdating }] =
        useUpdateUserProfileMutation();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        zipcode: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                city: user.city || '',
                state: user.state || '',
                zipcode: user.zipcode || '',
            });
        }
    }, [user, isEditing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleEnableEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setErrors({});
    };

    const handleProfileUpdate = async () => {
        const validation = updateProfileSchema.safeParse(formData);
        if (!validation.success) {
            const formattedErrors: Record<string, string> = {};
            validation.error.issues.forEach((issue) => {
                const key = issue.path[0];
                if (typeof key === 'string' || typeof key === 'number') {
                    formattedErrors[String(key)] = issue.message;
                }
            });
            setErrors(formattedErrors);
            return;
        }

        try {
            const updatedUser = await updateProfileApi({
                id: user.id,
                data: validation.data,
            }).unwrap();

            dispatch(updateUser(updatedUser));

            toast.success('Profile details updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleSaveClick = () => {
        void handleProfileUpdate();
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
                        startIcon={<EditRoundedIcon />}
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
                <Stack gap={3}>
                    <Grid2 container spacing={3}>
                        {FORM_EDIT_FIELDS.map(({ label, name, sm }) => (
                            <Grid2 key={name} size={{ xs: 12, sm }}>
                                <TextField
                                    fullWidth
                                    label={label}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleInputChange}
                                    error={!!errors[name]}
                                    helperText={errors[name]}
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
                            variant='contained'
                            color='primary'
                            size='large'
                            onClick={handleSaveClick}
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
