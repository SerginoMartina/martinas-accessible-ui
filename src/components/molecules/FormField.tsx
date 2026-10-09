import { cloneElement, useId } from 'react';
import type { ReactElement } from 'react';

export interface FormFieldProps {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactElement<Record<string, unknown>>;
}

export function FormField({
  id,
  label,
  hint,
  error,
  required = false,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const describedBy = [
    children.props['aria-describedby'],
    hint ? `${fieldId}-hint` : undefined,
    error ? `${fieldId}-error` : undefined,
  ]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ') || undefined;

  const control = cloneElement(children, {
    id: fieldId,
    required: required || children.props.required === true,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : children.props['aria-invalid'],
  });

  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium text-slate-800">
        {label}
        {required && <span className="ml-1 text-slate-600">(required)</span>}
      </label>
      {control}
      {hint && <p id={`${fieldId}-hint`} className="text-sm text-slate-600">{hint}</p>}
      {error && <p id={`${fieldId}-error`} className="text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
