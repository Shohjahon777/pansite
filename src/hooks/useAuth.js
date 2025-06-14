import {authAPI, tokenManager, userManager} from "@/src/utils/api";

export const useAuth = () => {
    const isAuthenticated = tokenManager.isValid()
    const user = userManager.get()

    return {
        isAuthenticated,
        user,
        userType: user?.role || null,
        isClient: user?.role === 'client',
        isMaster: user?.role === 'master',
        login: user?.role === 'master' ? authAPI.loginMaster : authAPI.loginClient,
        logout: authAPI.logout,
        token: tokenManager.get()
    }
}