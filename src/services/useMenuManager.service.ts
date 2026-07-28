import {
    useAddMenuItemMutation,
    useDeleteMenuItemMutation,
    useGetRestaurantMenuQuery,
    useUpdateMenuItemMutation,
} from '@api/menuManager.api';
import { MenuItemPayload } from '@type';

export const useMenuManagerService = () => {
    const [addMenuItemMutation, addStatus] = useAddMenuItemMutation();
    const [updateMenuItemMutation, updateStatus] = useUpdateMenuItemMutation();
    const [deleteMenuItemMutation, deleteStatus] = useDeleteMenuItemMutation();

    const addMenuItem = async (body: MenuItemPayload) =>
        await addMenuItemMutation(body).unwrap();

    const updateMenuItem = async (id: number, body: Partial<MenuItemPayload>) =>
        await updateMenuItemMutation({ id, body }).unwrap();

    const deleteMenuItem = async (id: number) =>
        await deleteMenuItemMutation(id).unwrap();

    return {
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        isAdding: addStatus.isLoading,
        isUpdating: updateStatus.isLoading,
        isDeleting: deleteStatus.isLoading,
        useGetRestaurantMenuQuery,
    };
};
