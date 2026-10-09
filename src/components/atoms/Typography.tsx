import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({ variant = 'p', className = '', children }: TypographyProps) => {
  const styles = {
    h1: 'text-4xl font-bold mb-4',
    h2: 'text-3xl font-semibold mb-3',
    h3: 'text-2xl font-medium mb-2',
    p: 'text-base text-secondary mb-2',
    span: 'font-medium',
  };

  const Element = variant;
  return <Element className={`${styles[variant]} ${className}`}>{children}</Element>;
};
