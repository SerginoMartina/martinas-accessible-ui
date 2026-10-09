import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import type { ReactElement, ReactNode, TextareaHTMLAttributes } from 'react';
import { Modal } from '../organisms/Modal';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupProps, RadioOption } from './RadioGroup';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextArea({ label, hint, error, id: suppliedId, className = '', ...props }: TextAreaProps) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  const descriptionIds = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-900">{label}{props.required && <span> (required)</span>}</label>
      {hint && <p id={`${id}-hint`} className="text-sm text-slate-700">{hint}</p>}
      <textarea
        {...props}
        id={id}
        aria-describedby={[props['aria-describedby'], descriptionIds].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? true : props['aria-invalid']}
        className={`min-h-28 w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:bg-slate-100 ${className}`}
      />
      {error && <p id={`${id}-error`} className="text-sm font-medium text-red-800">{error}</p>}
    </div>
  );
}

export interface RadioCardsProps extends RadioGroupProps {
  columns?: 1 | 2 | 3;
}

export function RadioCards({ columns = 2, className = '', options, ...props }: RadioCardsProps) {
  const cardOptions: RadioOption[] = options.map((option) => ({ ...option }));
  return (
    <RadioGroup
      {...props}
      options={cardOptions}
      className={className}
      orientation="horizontal"
      optionPresentation="card"
      columns={columns}
    />
  );
}

export interface CheckboxCardOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxCardsProps {
  name: string;
  legend: string;
  options: CheckboxCardOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function CheckboxCards({
  name,
  legend,
  options,
  value,
  defaultValue = [],
  onChange,
  hint,
  error,
  disabled = false,
  columns = 2,
  className = '',
}: CheckboxCardsProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = value ?? internalValue;
  const columnClass = columns === 1 ? 'sm:grid-cols-1' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  return (
    <fieldset className={className} aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined}>
      <legend className="font-medium text-slate-900">{legend}</legend>
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-slate-700">{hint}</p>}
      <ul className={`mt-3 grid gap-3 ${columnClass}`}>
        {options.map((option, index) => {
          const optionId = `${id}-option-${index}`;
          const checked = selected.includes(option.value);
          return (
            <li key={option.value}>
              <label htmlFor={optionId} className={`block h-full rounded-lg border p-4 ${checked ? 'border-blue-700 bg-blue-50' : 'border-slate-300 bg-white'} ${disabled || option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} focus-within:outline-2 focus-within:outline-blue-700`}>
                <span className="flex items-start gap-3">
                  <input
                    id={optionId}
                    type="checkbox"
                    name={name}
                    value={option.value}
                    checked={checked}
                    disabled={disabled || option.disabled}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...selected, option.value]
                        : selected.filter((item) => item !== option.value);
                      if (value === undefined) setInternalValue(next);
                      onChange?.(next);
                    }}
                    className="mt-1 h-4 w-4 accent-blue-700"
                  />
                  <span>
                    <span className="block font-medium text-slate-900">{option.label}</span>
                    {option.description && <span className="mt-1 block text-sm leading-5 text-slate-700">{option.description}</span>}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-red-800">{error}</p>}
    </fieldset>
  );
}

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, defaultChecked = false, onChange, label, disabled = false, className = '' }: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={() => {
        const next = !isChecked;
        if (checked === undefined) setInternalChecked(next);
        onChange?.(next);
      }}
      className={`inline-flex min-h-11 items-center gap-3 rounded-md text-left focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <span aria-hidden="true" className={`relative h-6 w-11 rounded-full transition-colors motion-reduce:transition-none ${isChecked ? 'bg-blue-700' : 'bg-slate-500'}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform motion-reduce:transition-none ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} />
      </span>
      <span>{label}</span>
    </button>
  );
}

export interface SliderProps {
  label: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function Slider({ label, value, defaultValue = 0, min = 0, max = 100, step = 1, onChange, disabled, className = '' }: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const id = useId();
  const current = value ?? internalValue;
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between gap-4 text-sm font-medium text-slate-900">
        <label id={`${id}-label`} htmlFor={id}>{label}</label>
        <output aria-live="off">{current}</output>
      </div>
      <input
        id={id}
        type="range"
        aria-labelledby={`${id}-label`}
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (value === undefined) setInternalValue(next);
          onChange?.(next);
        }}
        className="w-full accent-blue-700 focus-visible:outline-2 focus-visible:outline-blue-700"
      />
    </div>
  );
}

export interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  label: string;
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ label, options, value, defaultValue, onChange, className = '' }: SegmentedControlProps) {
  return (
    <RadioGroup
      name={useId()}
      legend={label}
      options={options}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      orientation="horizontal"
      optionPresentation="segmented"
      className={className}
    />
  );
}

export interface PopoverProps {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, title, children, className = '' }: DialogProps) {
  return <Modal isOpen={open} onClose={() => onOpenChange(false)} title={title} className={className}>{children}</Modal>;
}

export function Popover({ label, trigger, children, className = '' }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]')?.focus();
  }, [open]);

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-11 items-center rounded-md border border-slate-400 bg-white px-4 py-2 text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        {trigger}
      </button>
      {open && (
        <div ref={panelRef} id={id} role="dialog" aria-label={label} className="absolute left-0 top-full z-40 mt-2 w-72 rounded-lg border border-slate-300 bg-white p-4 text-slate-900 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

export interface HoverCardProps {
  trigger: ReactElement<{ 'aria-describedby'?: string }>;
  children: ReactNode;
  className?: string;
}

export function HoverCard({ trigger, children, className = '' }: HoverCardProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const describedBy = [trigger.props['aria-describedby'], open ? id : undefined].filter(Boolean).join(' ') || undefined;
  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      {cloneElement(trigger, { 'aria-describedby': describedBy })}
      {open && <span id={id} role="tooltip" className="absolute left-0 top-full z-30 mt-2 block w-64 rounded-lg border border-slate-300 bg-white p-4 text-sm text-slate-900 shadow-lg">{children}</span>}
    </span>
  );
}

export interface ScrollAreaProps {
  label: string;
  children: ReactNode;
  maxHeight?: string;
  className?: string;
}

export function ScrollArea({ label, children, maxHeight = '20rem', className = '' }: ScrollAreaProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`overflow-auto rounded-md border border-slate-300 focus-visible:outline-2 focus-visible:outline-blue-700 ${className}`}
      style={{ maxHeight, overscrollBehavior: 'contain' }}
    >
      {children}
    </div>
  );
}

export interface CarouselProps {
  label: string;
  slides: ReactNode[];
  className?: string;
}

export function Carousel({ label, slides, className = '' }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const id = useId();
  if (slides.length === 0) return null;
  const move = (offset: number) => setIndex((current) => (current + offset + slides.length) % slides.length);
  return (
    <section aria-label={label} aria-roledescription="carousel" className={className}>
      <div id={`${id}-slide`} aria-live="polite" aria-atomic="true" className="min-h-24 rounded-lg border border-slate-200 bg-white p-5">
        <div role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
          {slides[index]}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" aria-label="Previous slide" aria-controls={`${id}-slide`} onClick={() => move(-1)} className="min-h-11 rounded-md border border-slate-400 px-3 focus-visible:outline-2 focus-visible:outline-blue-700">Previous</button>
        <p className="text-sm text-slate-700" aria-hidden="true">{index + 1} / {slides.length}</p>
        <button type="button" aria-label="Next slide" aria-controls={`${id}-slide`} onClick={() => move(1)} className="min-h-11 rounded-md border border-slate-400 px-3 focus-visible:outline-2 focus-visible:outline-blue-700">Next</button>
      </div>
    </section>
  );
}

export interface ContextMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface ContextMenuProps {
  label: string;
  items: ContextMenuItem[];
  children: ReactNode;
  className?: string;
}

export function ContextMenu({ label, items, children, className = '' }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const triggerRef = useRef<HTMLDivElement>(null);

  const focusItem = (nextIndex: number, direction = 1) => {
    if (items.length === 0) return;
    const enabled = items.map((item, index) => item.disabled ? -1 : index).filter((index) => index !== -1);
    if (enabled.length === 0) return;
    const target = enabled.includes(nextIndex)
      ? nextIndex
      : direction > 0
        ? enabled.find((index) => index > nextIndex) ?? enabled[0]
        : [...enabled].reverse().find((index) => index < nextIndex) ?? enabled[enabled.length - 1];
    setActive(target);
    requestAnimationFrame(() => itemRefs.current[target]?.focus());
  };

  const openAt = (x: number, y: number, initialIndex = 0) => {
    setPosition({ x: Math.max(8, Math.min(x, window.innerWidth - 220)), y: Math.max(8, Math.min(y, window.innerHeight - 180)) });
    setOpen(true);
    focusItem(initialIndex);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div
        ref={triggerRef}
        tabIndex={0}
        onContextMenu={(event) => {
          event.preventDefault();
          openAt(event.clientX, event.clientY);
        }}
        onKeyDown={(event) => {
          if ((event.shiftKey && event.key === 'F10') || event.key === 'ContextMenu') {
            event.preventDefault();
            const bounds = event.currentTarget.getBoundingClientRect();
            openAt(bounds.left, bounds.bottom);
          }
        }}
        aria-label={`${label}. Press Shift+F10 or the context-menu key to open actions.`}
        className="rounded focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        {children}
      </div>
      {open && (
        <div
          role="menu"
          aria-label={label}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); focusItem(active + 1, 1); }
            else if (event.key === 'ArrowUp') { event.preventDefault(); focusItem(active - 1, -1); }
            else if (event.key === 'Home') { event.preventDefault(); focusItem(0); }
            else if (event.key === 'End') { event.preventDefault(); focusItem(items.length - 1, -1); }
            else if (event.key === 'Tab') setOpen(false);
          }}
          className="fixed z-50 min-w-48 rounded-lg border border-slate-300 bg-white p-1 shadow-lg"
          style={{ left: position.x, top: position.y }}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => { itemRefs.current[index] = element; }}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              tabIndex={active === index ? 0 : -1}
              onFocus={() => setActive(index)}
              onClick={() => { item.onSelect(); setOpen(false); triggerRef.current?.focus(); }}
              className="block min-h-10 w-full rounded px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export interface DataListItem {
  label: ReactNode;
  value: ReactNode;
}

export function DataList({ items, className = '' }: { items: DataListItem[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-[minmax(8rem,1fr)_2fr] gap-x-5 gap-y-3 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="contents">
          <dt className="font-medium text-slate-700">{item.label}</dt>
          <dd className="text-slate-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
