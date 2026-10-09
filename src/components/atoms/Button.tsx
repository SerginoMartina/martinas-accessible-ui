import React from 'react';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled, 
  type = 'button',
  className = '',
  ...props
}, ref) => {
  
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-secondary text-white hover:bg-gray-800",
    ghost: "bg-transparent text-secondary hover:bg-gray-100",
    outline: "border-2 border-primary text-primary hover:bg-blue-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
