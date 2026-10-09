import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
  src?: string;
  alt: string;
  name?: string;
  size?: AvatarSize;
  fallback?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word.charAt(0).toLocaleUpperCase()).join('');
}

export function Avatar({
  src,
  alt,
  name = alt,
  size = 'md',
  fallback,
  className = '',
  onError,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const decorative = alt.length === 0;
  const initials = fallback ?? getInitials(name);

  if (src && !failed) {
    return (
      <img
        {...props}
        src={src}
        alt={alt}
        onError={(event) => {
          setFailed(true);
          onError?.(event);
        }}
        className={`inline-flex shrink-0 rounded-full object-cover ${sizeStyles[size]} ${className}`}
      />
    );
  }

  return (
    <span
      {...props}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative || undefined}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-800 ${sizeStyles[size]} ${className}`}
    >
      {initials}
    </span>
  );
}
