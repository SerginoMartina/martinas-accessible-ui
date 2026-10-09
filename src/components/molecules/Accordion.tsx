import { useId, useState } from 'react';
import type { ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpenIds = [], className = '' }: AccordionProps) {
  const id = useId();
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenIds));

  const toggle = (itemId: string) => {
    setOpenIds((previous) => {
      const next = new Set(multiple ? previous : []);
      if (previous.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  return (
    <div className={`divide-y divide-slate-200 rounded-lg border border-slate-200 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${id}-trigger-${item.id}`;
        const panelId = `${id}-panel-${item.id}`;
        return (
          <section key={item.id}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item.title}
                <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-4 pb-4 text-sm leading-6 text-slate-600"
            >
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
}
