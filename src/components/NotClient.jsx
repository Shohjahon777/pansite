import { useAuth } from "@/src/hooks/useAuth";
import {Modal} from "@/src/components/Modal";

export const NotClientModal = ({
                                   isOpen,
                                   onClose,
                                   message = "This feature is only available for clients",
                                   showRoleInfo = true,
                                   showUpgradeButton = true,
                                   onUpgrade
                               }) => {
    const { user, userType } = useAuth();

    const handleUpgrade = () => {
        if (onUpgrade) {
            onUpgrade();
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="text-orange-600"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Access Restricted
                </h3>

                <p className="text-gray-600 mb-4">
                    {message}
                </p>

                {showRoleInfo && (
                    <div className="bg-gray-50 rounded-md p-4 mb-6 text-sm">
                        <p className="text-gray-700">
                            Your current role: <strong className="text-gray-900">{userType || 'Unknown'}</strong>
                        </p>
                        <p className="text-gray-600 mt-1">
                            Contact support if you believe this is an error.
                        </p>
                    </div>
                )}

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    {showUpgradeButton && (
                        <button
                            onClick={handleUpgrade}
                            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                        >
                            Upgrade Account
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};