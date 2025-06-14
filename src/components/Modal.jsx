import { useEffect, useRef } from 'react';

export const Modal = ({
                          isOpen,
                          onClose,
                          children,
                          closeOnOverlayClick = true,
                          closeOnEscape = true,
                          className = "",
                          size = "md"
                      }) => {
    const modalRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement;

            modalRef.current?.focus();

            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';

            previousFocusRef.current?.focus();
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!closeOnEscape) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <div
            className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={`modal-content bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full ${className}`}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div>
    );
};
