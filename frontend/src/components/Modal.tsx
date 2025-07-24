// src/components/Modal.tsx
import { ReactNode } from 'react';

export default function Modal({ isOpen, onClose, children }: {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}
