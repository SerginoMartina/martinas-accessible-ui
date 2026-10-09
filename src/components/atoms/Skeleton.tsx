export interface SkeletonProps {
  variant?: 'text' | 'button' | 'input' | 'card';
  className?: string;
  lines?: number;
}

const base = 'motion-safe:animate-pulse rounded bg-slate-200';

export function Skeleton({ variant = 'text', className = '', lines = 1 }: SkeletonProps) {
  if (variant === 'button') {
    return <span aria-hidden="true" className={`${base} inline-block h-10 w-28 ${className}`} />;
  }
  if (variant === 'input') {
    return (
      <span aria-hidden="true" className={`block space-y-2 ${className}`}>
        <span className={`${base} block h-4 w-24`} />
        <span className={`${base} block h-10 w-full`} />
      </span>
    );
  }
  if (variant === 'card') {
    return (
      <span aria-hidden="true" className={`block rounded-lg border border-slate-200 p-5 ${className}`}>
        <span className={`${base} mb-4 block h-6 w-2/5`} />
        <span className={`${base} mb-2 block h-4 w-full`} />
        <span className={`${base} block h-4 w-4/5`} />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`block space-y-2 ${className}`}>
      {Array.from({ length: Math.max(1, Math.floor(lines)) }, (_, index) => (
        <span key={index} className={`${base} block h-4 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </span>
  );
}
