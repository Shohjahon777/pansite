import { useState, useCallback } from 'react';

export const useAuthModal = () => {
    const [authModalState, setAuthModalState] = useState({
        isOpen: false,
        type: null,
        config: {}
    });

    const showAuthModal = useCallback((type, config = {}) => {
        setAuthModalState({
            isOpen: true,
            type,
            config
        });
    }, []);

    const hideAuthModal = useCallback(() => {
        setAuthModalState({
            isOpen: false,
            type: null,
            config: {}
        });
    }, []);

    const showNotAuthenticated = useCallback((config) => {
        showAuthModal('not-authenticated', config);
    }, [showAuthModal]);

    const showNotClient = useCallback((config) => {
        showAuthModal('not-client', config);
    }, [showAuthModal]);

    return {
        ...authModalState,
        showAuthModal,
        hideAuthModal,
        showNotAuthenticated,
        showNotClient
    };
};