import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@api/auth.api';
import { baseApi } from '@api/base.api';
import { ROUTES } from '@constant';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout as logoutAction } from '@store/slices';
import { getErrorMessage } from '@utils/errorHandler.util';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user, token, isAuthenticated } = useAppSelector(
        (state) => state.auth,
    );

    const { useLogoutMutation } = authApi;
    const [logoutServer] = useLogoutMutation();

    const logout = async () => {
        try {
            await logoutServer().unwrap();
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            toast.error(errorMsg);
        } finally {
            dispatch(baseApi.util.resetApiState());
            dispatch(logoutAction());
            void navigate(ROUTES.LOGIN);
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        isOwner: user?.role === 3,
        logout,
    };
};
