import React from 'react';
import { ToastProps } from './Toast.types';

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose,
  className = '',
  ...props 
}: ToastProps) => {
  
  const baseStyles = "fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-3 text-white animate-in fade-in slide-in-from-top-2 duration-300";
  
  const variantStyles = {
    info: "bg-blue-600",
    success: "bg-green-700",
    warning: "bg-amber-700",
    danger: "bg-red-600",
  };

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`${baseStyles} ${variantStyles[type]} ${className}`} role="alert" {...props}>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="hover:bg-white/20 rounded p-1"
          aria-label="Close toast"
        >
          ✕
        </button>
      )}
    </div>
  );
};
