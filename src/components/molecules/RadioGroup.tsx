import { useId, useState } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  legend: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  optionPresentation?: 'standard' | 'card' | 'segmented';
  columns?: 1 | 2 | 3;
  className?: string;
}

export function RadioGroup({
  options,
  name,
  legend,
  value,
  defaultValue,
  onChange,
  hint,
  error,
  required = false,
  disabled = false,
  orientation = 'vertical',
  optionPresentation = 'standard',
  columns = 2,
  className = '',
}: RadioGroupProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const describedBy = [
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset
      className={`min-w-0 ${className}`}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      disabled={disabled}
    >
      <legend className="text-sm font-medium text-slate-900">
        {legend}
        {required && <span className="ml-1 text-slate-600">(required)</span>}
      </legend>
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-slate-600">{hint}</p>}
      <div className={`mt-3 gap-3 ${
        optionPresentation === 'card'
          ? `grid ${columns === 1 ? 'sm:grid-cols-1' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`
          : optionPresentation === 'segmented'
            ? 'inline-flex flex-wrap rounded-lg border border-slate-400 bg-slate-100 p-1'
            : `flex ${orientation === 'horizontal' ? 'flex-wrap' : 'flex-col'}`
      }`}>
        {options.map((option, index) => {
          const optionId = `${id}-option-${index}`;
          const descriptionId = option.description ? `${optionId}-description` : undefined;
          const selected = selectedValue === option.value;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`${
                optionPresentation === 'card'
                  ? `flex h-full items-start gap-3 rounded-lg border p-4 ${selected ? 'border-blue-700 bg-blue-50' : 'border-slate-300 bg-white'}`
                  : optionPresentation === 'segmented'
                    ? `flex min-h-10 items-center gap-2 rounded-md px-3 py-2 ${selected ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-700'}`
                    : 'flex items-start gap-2'
              } ${disabled || option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} focus-within:outline-2 focus-within:outline-blue-700`}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                required={required}
                disabled={disabled || option.disabled}
                aria-describedby={descriptionId}
                onChange={(event) => {
                  if (event.target.checked) {
                    if (value === undefined) setInternalValue(option.value);
                    onChange?.(option.value);
                  }
                }}
                className={`${optionPresentation === 'segmented' ? 'sr-only' : 'mt-1 h-4 w-4'} accent-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700`}
              />
              <span>
                <span className="block text-sm font-medium text-slate-800">{option.label}</span>
                {option.description && (
                  <span id={descriptionId} className="mt-0.5 block text-sm text-slate-600">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">{error}</p>}
    </fieldset>
  );
}
