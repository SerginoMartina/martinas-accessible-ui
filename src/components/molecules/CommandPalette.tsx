import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  onSelect: () => void;
  keywords?: string[];
  disabled?: boolean;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  label?: string;
  placeholder?: string;
  triggerLabel?: string;
  shortcut?: string;
  className?: string;
}

export function CommandPalette({
  items,
  label = 'Command palette',
  placeholder = 'Search commands…',
  triggerLabel = 'Open command palette',
  shortcut = 'k',
  className = '',
}: CommandPaletteProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => items.filter((item) => {
    const searchText = `${item.label} ${item.description ?? ''} ${(item.keywords ?? []).join(' ')}`;
    return searchText.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
  }), [items, query]);

  const findEnabled = (start: number, direction: 1 | -1) => {
    if (results.length === 0) return -1;
    for (let offset = 0; offset < results.length; offset += 1) {
      const index = (start + direction * offset + results.length * 2) % results.length;
      if (!results[index].disabled) return index;
    }
    return -1;
  };

  const close = () => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openPalette = () => {
    setOpen(true);
    setQuery('');
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcut.toLowerCase()) {
        event.preventDefault();
        openPalette();
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  });

  useEffect(() => {
    if (activeIndex < 0 || activeIndex >= results.length || results[activeIndex]?.disabled) {
      setActiveIndex(findEnabled(0, 1));
    }
  }, [activeIndex, results]);

  const chooseActive = () => {
    const item = results[activeIndex];
    if (!item || item.disabled) return;
    item.onSelect();
    close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openPalette}
        aria-haspopup="dialog"
        className={`inline-flex min-h-11 items-center gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 ${className}`}
      >
        <span>{triggerLabel}</span>
        <kbd className="rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5 text-xs text-slate-600">⌘/Ctrl+{shortcut.toUpperCase()}</kbd>
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-4 pt-[15vh]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                close();
              } else if (event.key === 'ArrowDown' && results.length > 0) {
                event.preventDefault();
                setActiveIndex((index) => findEnabled(index + 1, 1));
              } else if (event.key === 'ArrowUp' && results.length > 0) {
                event.preventDefault();
                setActiveIndex((index) => findEnabled(index < 0 ? results.length - 1 : index - 1, -1));
              } else if (event.key === 'Enter') {
                event.preventDefault();
                chooseActive();
              } else if (event.key === 'Tab') {
                event.preventDefault();
                inputRef.current?.focus();
              }
            }}
          >
            <h2 id={`${id}-title`} className="sr-only">{label}</h2>
            <input
              ref={inputRef}
              type="search"
              role="combobox"
              aria-label={label}
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={results.length > 0 ? `${id}-listbox` : undefined}
              aria-activedescendant={results[activeIndex] ? `${id}-option-${results[activeIndex].id}` : undefined}
              placeholder={placeholder}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              className="min-h-14 w-full border-b border-slate-200 px-5 text-base text-slate-950 outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700"
            />
            {results.length > 0 ? (
              <ul id={`${id}-listbox`} role="listbox" aria-label={`${label} results`} className="max-h-[50vh] overflow-y-auto p-2">
                {results.map((item, index) => (
                  <li
                    id={`${id}-option-${item.id}`}
                    key={item.id}
                    role="option"
                    aria-selected={index === activeIndex}
                    aria-disabled={item.disabled || undefined}
                    onMouseEnter={() => !item.disabled && setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onSelect();
                        close();
                      }
                    }}
                    className={`rounded-md px-3 py-3 ${
                      item.disabled ? 'text-slate-400' :
                      index === activeIndex ? 'bg-blue-50 text-blue-950' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-sm font-medium">{item.label}</span>
                    {item.description && <span className="mt-0.5 block text-xs text-slate-600">{item.description}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p role="status" className="px-5 py-6 text-sm text-slate-600">No matching commands.</p>
            )}
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
