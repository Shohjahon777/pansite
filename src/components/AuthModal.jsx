import {NotAuthenticatedModal} from "@/src/components/NotAuthenticated";
import {NotClientModal} from "@/src/components/NotClient";

export const AuthModal = ({
                              isOpen,
                              onClose,
                              type,
                              config = {}
                          }) => {
    if (type === 'not-authenticated') {
        return (
            <NotAuthenticatedModal
                isOpen={isOpen}
                onClose={onClose}
                {...config}
            />
        );
    }

    if (type === 'not-client') {
        return (
            <NotClientModal
                isOpen={isOpen}
                onClose={onClose}
                {...config}
            />
        );
    }

    return null;
};