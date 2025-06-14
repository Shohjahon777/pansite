import { useRouter } from "next/navigation";
import {Modal} from "@/src/components/Modal";

export const NotAuthenticatedModal = ({
                                          isOpen,
                                          onClose,
                                          message = "Please login to continue",
                                          showLoginButton = true,
                                          onLogin,
                                          redirectTo = '/account'
                                      }) => {
    const router = useRouter();

    const handleLogin = () => {
        if (onLogin) {
            onLogin();
        } else {
            router.push(redirectTo);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="text-blue-600"
                        strokeWidth="2"
                    >
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.395 0 4.575.927 6.18 2.44"/>
                        <path d="M16 8l2-2 4 4"/>
                    </svg>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Authentication Required
                </h3>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    {showLoginButton && (
                        <button
                            onClick={handleLogin}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Login Now
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};
