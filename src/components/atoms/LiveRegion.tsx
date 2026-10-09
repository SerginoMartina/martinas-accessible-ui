import type { ReactNode } from 'react';

export interface LiveRegionProps {
  children: ReactNode;
  politeness?: 'polite' | 'assertive';
  atomic?: boolean;
  className?: string;
}

export function LiveRegion({
  children,
  politeness = 'polite',
  atomic = true,
  className = '',
}: LiveRegionProps) {
  return (
    <div
      aria-live={politeness}
      aria-atomic={atomic}
      role={politeness === 'assertive' ? 'alert' : 'status'}
      className={`sr-only ${className}`}
    >
      {children}
    </div>
  );
}
