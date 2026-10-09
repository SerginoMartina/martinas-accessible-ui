import { useId, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onInputChange?: (query: string) => void;
  hint?: string;
  placeholder?: string;
  noResultsText?: string;
  loading?: boolean;
  loadingText?: string;
  allowCustomValue?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Combobox({
  options,
  label,
  value,
  defaultValue,
  onChange,
  onInputChange,
  hint,
  placeholder = 'Start typing to search',
  noResultsText = 'No suggestions found.',
  loading = false,
  loadingText = 'Loading suggestions…',
  allowCustomValue = false,
  disabled = false,
  className = '',
}: ComboboxProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedValue = value ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const filteredOptions = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return search
      ? options.filter((option) =>
          `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(search),
        )
      : options;
  }, [options, query]);
  const activeOption = filteredOptions[activeIndex];
  const describedBy = hint ? `${id}-hint` : undefined;

  const selectValue = (nextValue: string) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
  };

  const moveActiveOption = (direction: 1 | -1) => {
    if (filteredOptions.length === 0) return;
    let index = activeIndex;
    if (index < 0 && direction < 0) index = 0;
    for (let attempt = 0; attempt < filteredOptions.length; attempt += 1) {
      index = (index + direction + filteredOptions.length) % filteredOptions.length;
      if (!filteredOptions[index].disabled) {
        setActiveIndex(index);
        return;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) setOpen(true);
      moveActiveOption(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) setOpen(true);
      moveActiveOption(-1);
    } else if (event.key === 'Enter') {
      if (open && activeOption && !activeOption.disabled) {
        event.preventDefault();
        selectValue(activeOption.value);
      } else if (allowCustomValue && query.trim()) {
        event.preventDefault();
        selectValue(query.trim());
      }
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      setQuery('');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setActiveIndex(-1);
    setOpen(true);
    onInputChange?.(nextQuery);
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <label htmlFor={`${id}-input`} className="mb-1 block text-sm font-medium text-slate-800">
        {label}
      </label>
      {hint && <p id={`${id}-hint`} className="mb-1 text-sm text-slate-600">{hint}</p>}
      <input
        ref={inputRef}
        id={`${id}-input`}
        type="text"
        role="combobox"
        value={open ? query : selectedOption?.label ?? selectedValue}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open && !loading && filteredOptions.length > 0 ? `${id}-listbox` : undefined}
        aria-activedescendant={open && activeOption ? `${id}-option-${activeIndex}` : undefined}
        aria-describedby={describedBy}
        onFocus={() => {
          if (!open) {
            setQuery(selectedOption?.label ?? selectedValue);
            setOpen(true);
          }
        }}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setOpen(false);
          setQuery('');
          setActiveIndex(-1);
        }}
        className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          {loading ? (
            <p role="status" className="px-3 py-3 text-sm text-slate-600">{loadingText}</p>
          ) : filteredOptions.length > 0 ? (
            <ul id={`${id}-listbox`} role="listbox" aria-label={`${label} suggestions`} className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.map((option, index) => (
                <li
                  id={`${id}-option-${index}`}
                  key={option.value}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  aria-disabled={option.disabled || undefined}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                  onClick={() => !option.disabled && selectValue(option.value)}
                  className={`rounded px-3 py-2 text-sm ${
                    option.disabled ? 'cursor-not-allowed text-slate-400' :
                    activeIndex === index ? 'bg-blue-50 text-blue-950' : 'cursor-pointer text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="block font-medium">{option.label}</span>
                  {option.description && <span className="mt-0.5 block text-xs text-slate-600">{option.description}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p role="status" className="px-3 py-3 text-sm text-slate-600">{noResultsText}</p>
          )}
        </div>
      )}
    </div>
  );
}
