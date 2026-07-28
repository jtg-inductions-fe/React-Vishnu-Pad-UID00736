import { MenuItemFormData } from '@validations/menuItem.validation';

export interface MenuItemFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MenuItemFormData) => void;
    initialData?: Partial<MenuItemFormData>;
    isLoading?: boolean;
}
