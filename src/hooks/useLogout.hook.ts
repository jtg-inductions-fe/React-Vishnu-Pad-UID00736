import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@api/auth.api';
import { baseApi } from '@api/base.api';
import { ROUTES } from '@routes/routes.constants';
import { useAppDispatch } from '@store/hooks';
import { logout } from '@store/slices';
import { getErrorMessage } from '@utils';

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [logoutServer] = useLogoutMutation();

    const executeLogout = async () => {
        try {
            await logoutServer().unwrap();
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
        } finally {
            dispatch(baseApi.util.resetApiState());

            dispatch(logout());

            void navigate(ROUTES.LOGIN);
        }
    };

    return executeLogout;
};
