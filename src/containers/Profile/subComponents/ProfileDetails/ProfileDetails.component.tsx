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

import { FONT_WEIGHT } from '@constant';
import { FORM_EDIT_FIELDS, PROFILE_DISPLAY_FIELDS } from '@containers';
import { PROFILE_VALIDATION_RULES } from '@validations/profile.validation';

import { ProfileDetailsProps } from './ProfileDetails.types';

export const ProfileDetails = ({
    user,
    isEditing,
    isUpdating,
    register,
    isDisabled,
    errors,
    onEnableEdit,
    onCancelEdit,
    onSubmitForm,
}: ProfileDetailsProps) => (
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
            <Typography variant='h6'>Profile Information</Typography>
            {!isEditing && (
                <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                    startIcon={<EditRounded />}
                    onClick={onEnableEdit}
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
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    <Box>
                        <Typography variant='h5'>{user.name}</Typography>
                        <Typography variant='body1' color='text.secondary'>
                            {user.email}
                        </Typography>
                    </Box>
                </Stack>
                <Divider />
                <Grid2 container spacing={4}>
                    {PROFILE_DISPLAY_FIELDS.map(({ label, key }) => (
                        <Grid2 key={key} size={{ xs: 12, sm: 4 }}>
                            <Stack gap={0.5}>
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                    textTransform='uppercase'
                                    fontWeight={FONT_WEIGHT.MEDIUM}
                                >
                                    {label}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    fontWeight={FONT_WEIGHT.REGULAR}
                                >
                                    {user[key] || '—'}
                                </Typography>
                            </Stack>
                        </Grid2>
                    ))}
                </Grid2>
            </Stack>
        ) : (
            <Stack component='form' onSubmit={onSubmitForm} gap={3}>
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
                <Stack direction='row' justifyContent='flex-end' gap={2} pt={2}>
                    <Button
                        variant='text'
                        color='inherit'
                        size='large'
                        onClick={onCancelEdit}
                        disabled={isDisabled || isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        disabled={isDisabled || isUpdating}
                        disableElevation
                    >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Stack>
            </Stack>
        )}
    </Box>
);
