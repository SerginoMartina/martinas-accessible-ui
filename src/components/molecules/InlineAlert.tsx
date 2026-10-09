import type { ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface InlineAlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'border-blue-700 bg-blue-50 text-blue-950',
  success: 'border-green-700 bg-green-50 text-green-950',
  warning: 'border-amber-700 bg-amber-50 text-amber-950',
  error: 'border-red-700 bg-red-50 text-red-950',
};

export function InlineAlert({
  variant = 'info',
  title,
  children,
  className = '',
}: InlineAlertProps) {
  const role = variant === 'error' ? 'alert' : 'status';

  return (
    <div
      role={role}
      className={`rounded-md border-l-4 p-4 ${variantStyles[variant]} ${className}`}
    >
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? 'mt-1 text-sm' : 'text-sm'}>{children}</div>
    </div>
  );
}
