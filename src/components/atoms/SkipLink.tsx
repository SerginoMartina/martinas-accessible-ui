import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  href?: string;
}

export function SkipLink({
  children = 'Skip to main content',
  href = '#main-content',
  className = '',
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={`absolute left-4 top-2 z-[100] -translate-y-[150%] rounded-md bg-slate-950 px-4 py-3 font-semibold text-white focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-700 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
