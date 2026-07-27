import {
    ProfileUpdateRequest,
    useDeleteUserProfileMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
} from '@api/user.api';

export const useUserService = () => {
    const [updateProfileMutation, updateStatus] =
        useUpdateUserProfileMutation();
    const [deleteProfileMutation, deleteStatus] =
        useDeleteUserProfileMutation();

    const updateProfile = async (
        id: number | string,
        data: ProfileUpdateRequest,
    ) => await updateProfileMutation({ id, data }).unwrap();

    const deleteProfile = async (id: number | string) =>
        await deleteProfileMutation(id).unwrap();

    return {
        updateProfile,
        deleteProfile,
        isUpdating: updateStatus.isLoading,
        isDeleting: deleteStatus.isLoading,
        useGetUserProfileQuery,
        useUpdateUserProfileMutation,
        useDeleteUserProfileMutation,
    };
};
