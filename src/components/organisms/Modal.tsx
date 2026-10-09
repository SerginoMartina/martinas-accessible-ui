import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps as BaseModalProps } from './Modal.types';

interface ModalProps extends BaseModalProps {
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = React.useId();

  useEffect(() => {
    if (isOpen) {
      triggerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Focus the first focusable element or the modal container
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        if (!modalRef.current) return;
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (focusable.length === 0) {
          e.preventDefault();
          modalRef.current.focus();
        } else if (e.shiftKey && (document.activeElement === first || !modalRef.current.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !modalRef.current.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      };

      window.addEventListener('keydown', handleEsc);
      window.addEventListener('keydown', handleTab);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', handleEsc);
        window.removeEventListener('keydown', handleTab);
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 id={titleId} className="text-xl font-bold">{title}</h2>
            <button 
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close Modal"
            >
              ✕
            </button>
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
