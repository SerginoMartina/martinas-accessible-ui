import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { KeyboardEvent } from 'react';

export interface LanguageOption {
  tag: string;
  label: string;
}

export interface LanguageSwitcherProps {
  languages: LanguageOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (languageTag: string) => void;
  label?: string;
  variant?: 'select' | 'menu';
  disabled?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  languages,
  value,
  defaultValue,
  onChange,
  label = 'Language',
  variant = 'select',
  disabled = false,
  className = '',
}: LanguageSwitcherProps) {
  const id = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? languages[0]?.tag ?? '');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedValue = value ?? uncontrolledValue;
  const selectedLanguage = languages.find((language) => language.tag === selectedValue);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = event.target.value;
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
  };

  const chooseLanguage = (languageTag: string) => {
    if (value === undefined) setUncontrolledValue(languageTag);
    onChange?.(languageTag);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const focusLanguage = (index: number) => {
    if (languages.length === 0) return;
    const nextIndex = (index + languages.length) % languages.length;
    setActiveIndex(nextIndex);
    requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus());
  };

  const openMenu = () => {
    if (languages.length === 0) return;
    const selectedIndex = Math.max(0, languages.findIndex((language) => language.tag === selectedValue));
    setActiveIndex(selectedIndex);
    setOpen(true);
    requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === 'Tab') {
      setOpen(false);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusLanguage(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusLanguage(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusLanguage(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusLanguage(languages.length - 1);
    }
  };

  return (
    <div ref={rootRef} className={`relative inline-flex items-center gap-2 ${className}`} onKeyDown={handleMenuKeyDown}>
      {variant === 'select' ? (
        <>
          <label htmlFor={id} className="text-sm font-medium text-slate-800">{label}</label>
          <select
            id={id}
            value={selectedValue}
            onChange={handleChange}
            disabled={disabled || languages.length === 0}
            className="min-h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            {languages.map((language) => (
              <option key={language.tag} value={language.tag} lang={language.tag}>
                {language.label}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <button
            ref={triggerRef}
            type="button"
            aria-label={`${label}: ${selectedLanguage?.label ?? selectedValue}`}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={`${id}-menu`}
            disabled={disabled || languages.length === 0}
            onClick={() => (open ? setOpen(false) : openMenu())}
            onKeyDown={(event) => {
              if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
                event.preventDefault();
                openMenu();
              }
            }}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <span>{label}: {selectedLanguage?.label ?? selectedValue}</span>
            <span aria-hidden="true">▾</span>
          </button>
          {open && (
            <div id={`${id}-menu`} role="menu" aria-label={label} className="absolute right-0 top-full z-30 mt-1 min-w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg">
              {languages.map((language, index) => (
                <button
                  key={language.tag}
                  ref={(element) => { optionRefs.current[index] = element; }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selectedValue === language.tag}
                  lang={language.tag}
                  tabIndex={-1}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => chooseLanguage(language.tag)}
                  className={`block min-h-10 w-full rounded px-3 py-2 text-left text-sm focus:outline-none ${
                    selectedValue === language.tag ? 'bg-blue-50 font-medium text-blue-950' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    {language.label}
                    {selectedValue === language.tag && <span aria-hidden="true">✓</span>}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
