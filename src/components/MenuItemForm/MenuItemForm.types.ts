import { MenuItemFormValues } from '@validations/menuItem.schema';

export interface MenuItemFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MenuItemFormValues) => void;
    initialData?: MenuItemFormValues | null;
    isLoading?: boolean;
}
