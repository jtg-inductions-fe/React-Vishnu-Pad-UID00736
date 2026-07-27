import {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} from '@api/auth.api';
export const useAuthService = () => {
    const [login, loginMeta] = useLoginMutation();
    const [register, registerMeta] = useRegisterMutation();
    const [logout, logoutMeta] = useLogoutMutation();

    return {
        login,
        register,
        logout,
        isLoginLoading: loginMeta.isLoading,
        isRegisterLoading: registerMeta.isLoading,
        isLogoutLoading: logoutMeta.isLoading,
    };
};
