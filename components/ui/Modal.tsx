import React, { useState, useEffect, useRef } from 'react';
import { ModalProps } from '@/lib/types/modal';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      setIsMounted(false);
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && isMounted) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, isMounted]);

  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          className={`fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center ${className}`}
        >
          <div className="bg-white rounded-lg shadow-lg relative w-full max-w-md p-6">
            {children}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;