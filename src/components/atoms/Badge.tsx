import React from 'react';
import { BadgeProps } from './Badge.types';

export const Badge = ({ 
  variant = 'default', 
  children, 
  className = '' 
}: BadgeProps) => {
  
  const baseStyles = "px-2 py-1 rounded-full text-xs font-semibold";
  
  const variants = {
    default: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
