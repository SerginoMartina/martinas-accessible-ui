import { useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label: string;
  placeholder?: string;
  noResultsText?: string;
  className?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  label,
  placeholder = 'Choose an option',
  noResultsText = 'No results found',
  className = '',
}: SelectProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedValue = value ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return options.filter((option) =>
      `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [options, query]);
  const enabledOptions = filteredOptions.filter((option) => !option.disabled);

  const choose = (option: SelectOption) => {
    if (option.disabled) return;
    if (value === undefined) setUncontrolledValue(option.value);
    onChange?.(option.value);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
  };

  const openMenu = () => {
    setOpen(true);
    setQuery('');
    setActiveIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open && ['ArrowDown', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      openMenu();
      return;
    }
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      setQuery('');
      triggerRef.current?.focus();
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (enabledOptions.length === 0) return;
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = activeIndex < 0
        ? (delta > 0 ? 0 : enabledOptions.length - 1)
        : (activeIndex + delta + enabledOptions.length) % enabledOptions.length;
      setActiveIndex(nextIndex);
      requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus());
      return;
    }
    if (event.key === 'Enter' && enabledOptions.length > 0) {
      event.preventDefault();
      choose(enabledOptions[activeIndex] ?? enabledOptions[0]);
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className}`} onKeyDown={handleKeyDown}>
      <span id={`${id}-label`} className="mb-1 block text-sm font-medium text-slate-800">{label}</span>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-labelledby={`${id}-label`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        className="flex min-h-11 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        <span className={selectedOption ? 'text-slate-900' : 'text-slate-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span aria-hidden="true" className="text-slate-500">⌄</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          <input
            ref={inputRef}
            id={`${id}-input`}
            type="search"
            aria-label={`Search ${label.toLowerCase()}`}
            aria-controls={`${id}-listbox`}
            aria-activedescendant={enabledOptions[activeIndex] ? `${id}-option-${filteredOptions.indexOf(enabledOptions[activeIndex])}` : undefined}
            placeholder="Search options..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
            }}
            className="w-full border-b border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
          />
          {filteredOptions.length > 0 ? (
            <ul id={`${id}-listbox`} role="listbox" aria-label={label} className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.map((option, index) => {
                const enabledIndex = enabledOptions.indexOf(option);
                return (
                  <li key={option.value} role="presentation">
                    <button
                      ref={(element) => {
                        if (enabledIndex >= 0) optionRefs.current[enabledIndex] = element;
                      }}
                      id={`${id}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={option.value === selectedValue}
                      disabled={option.disabled}
                      tabIndex={-1}
                      onMouseEnter={() => !option.disabled && setActiveIndex(enabledIndex)}
                      onClick={() => choose(option)}
                      className={`flex w-full items-start gap-3 rounded px-3 py-2 text-left focus:outline-none ${
                        enabledIndex === activeIndex ? 'bg-blue-50' : 'hover:bg-slate-50'
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {option.icon && <span aria-hidden="true" className="mt-0.5">{option.icon}</span>}
                      <span>
                        <span className="block text-sm font-medium text-slate-900">{option.label}</span>
                        {option.description && <span className="mt-0.5 block text-xs text-slate-500">{option.description}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p role="status" className="px-3 py-4 text-sm text-slate-600">{noResultsText}</p>
          )}
        </div>
      )}
    </div>
  );
}
