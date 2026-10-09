import React from 'react';

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'type'> {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
  duration?: number;
  onClose?: () => void;
}
