import React, { useMemo, useState } from 'react';
import type { MultiSelectProps } from './MultiSelect.types';

export const MultiSelect = ({
  options,
  placeholder = 'Select options...',
  onChange,
  ...props
}: MultiSelectProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const comboboxRef = React.useRef<HTMLDivElement>(null);
  const listboxId = React.useId();

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const matchesSearch = opt.label.toLowerCase().includes(searchTerm.toLowerCase());
      const isAlreadySelected = selected.includes(opt.value);
      return matchesSearch && (!isAlreadySelected || !opt.multiple);
    });
  }, [options, selected, searchTerm]);

  const handleSelect = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(next);
    onChange?.(next);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex flex-wrap gap-2 p-2 border rounded-md bg-surface focus-within:ring-2 focus:ring-primary ${isOpen ? 'border-primary' : 'border-gray-300'}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'Escape') {
            setIsOpen(false);
          } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        ref={comboboxRef}
        role="combobox"
        aria-label={placeholder}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
        {...props}
      >
        {selected.length === 0 && <span className="text-gray-400">{placeholder}</span>}
        {selected.map((val) => {
          const option = options.find((o) => o.value === val);
          if (!option) return null;
          return (
            <span key={val} className="bg-primary text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
              {option.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(val);
                }}
                className="hover:text-red-200"
                aria-label={`Remove ${option.label}`}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full p-2 border-b focus:outline-none"
            placeholder="Search..."
            aria-label="Search options"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                event.currentTarget.parentElement
                  ?.querySelector<HTMLElement>('[role="option"]')
                  ?.focus();
              } else if (event.key === 'Escape') {
                setIsOpen(false);
                comboboxRef.current?.focus();
              }
            }}
            autoFocus
          />
          <ul id={listboxId} role="listbox" className="p-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => handleSelect(opt.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleSelect(opt.value);
                    } else if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      event.currentTarget.nextElementSibling instanceof HTMLElement
                        ? event.currentTarget.nextElementSibling.focus()
                        : comboboxRef.current?.parentElement
                            ?.querySelector<HTMLElement>('input[aria-label="Search options"]')
                            ?.focus();
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault();
                      event.currentTarget.previousElementSibling instanceof HTMLElement
                        ? event.currentTarget.previousElementSibling.focus()
                        : comboboxRef.current?.parentElement
                            ?.querySelector<HTMLElement>('input[aria-label="Search options"]')
                            ?.focus();
                    } else if (event.key === 'Escape') {
                      setIsOpen(false);
                      comboboxRef.current?.focus();
                    }
                  }}
                  role="option"
                  aria-selected={selected.includes(opt.value)}
                  tabIndex={0}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
