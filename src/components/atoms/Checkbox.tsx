import React from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled, 
  id,
  ...props 
}: CheckboxProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const baseStyles = "flex items-center gap-2 cursor-pointer";
  const disabledStyles = "opacity-50 cursor-not-allowed";
  
  return (
    <div className={disabled ? `${baseStyles} ${disabledStyles}` : baseStyles}>
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        {...props}
      />
      {label && <label htmlFor={inputId} className="text-sm font-medium text-secondary">{label}</label>}
    </div>
  );
};
