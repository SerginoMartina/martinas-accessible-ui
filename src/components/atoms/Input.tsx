import React from 'react';
import type { InputProps } from './Input.types';

export const Input = ({
  label,
  error,
  id,
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const baseStyles = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 transition-all';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseStyles} ${errorStyles}`}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};
