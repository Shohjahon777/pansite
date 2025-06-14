import {useAuth} from "@/src/hooks/useAuth";

export const useAuthGuard = () => {
    const auth = useAuth();

    return {
        ...auth,
        canAccess: (requireClient = false) => {
            if (!auth.isAuthenticated) return false;
            if (requireClient && !auth.isClient) return false;
            return true;
        },
        getRestrictionReason: (requireClient = false) => {
            if (!auth.isAuthenticated) return 'not-authenticated';
            if (requireClient && !auth.isClient) return 'not-client';
            return null;
        }
    };
};