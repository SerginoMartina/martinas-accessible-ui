import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

export interface MenuButtonItem {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface MenuButtonProps {
  label: string;
  items: MenuButtonItem[];
  className?: string;
}

export function MenuButton({ label, items, className = '' }: MenuButtonProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);

  const focusItem = (direction: 1 | -1, fromIndex = -1) => {
    for (let offset = 1; offset <= items.length; offset += 1) {
      const index = (fromIndex + direction * offset + items.length) % items.length;
      if (!items[index].disabled) {
        itemRefs.current[index]?.focus();
        return;
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === 'Tab' && open) {
      setOpen(false);
      return;
    }
    if (!open) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const index = itemRefs.current.findIndex((item) => item === document.activeElement);
      focusItem(1, index);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const index = itemRefs.current.findIndex((item) => item === document.activeElement);
      focusItem(-1, index < 0 ? 0 : index);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItem(1, -1);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItem(-1, 0);
    }
  };

  const openMenu = (focusLast = false) => {
    setOpen(true);
    requestAnimationFrame(() => focusItem(focusLast ? -1 : 1, focusLast ? 0 : -1));
  };

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (!open && event.key === 'ArrowUp') {
            event.preventDefault();
            openMenu(true);
          }
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        {label}<span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div role="menu" aria-label={label} className="absolute left-0 z-30 mt-1 min-w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg">
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => { itemRefs.current[index] = element; }}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={item.disabled}
              onClick={() => {
                item.onSelect();
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="block min-h-10 w-full rounded px-3 py-2 text-left text-sm text-slate-800 hover:bg-slate-100 focus:bg-blue-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
