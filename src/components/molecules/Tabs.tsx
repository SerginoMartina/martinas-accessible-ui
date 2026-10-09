import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onChange?: (tabId: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function Tabs({
  tabs,
  defaultTabId,
  activeTabId,
  onChange,
  ariaLabel = 'Tabs',
  className = '',
}: TabsProps) {
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstEnabled = tabs.find((tab) => !tab.disabled)?.id;
  const [uncontrolledId, setUncontrolledId] = useState(defaultTabId ?? firstEnabled);
  const selectedId = activeTabId ?? uncontrolledId;
  const selected = tabs.find((tab) => tab.id === selectedId && !tab.disabled) ?? tabs.find((tab) => !tab.disabled);

  const selectTab = (tabId: string) => {
    if (activeTabId === undefined) setUncontrolledId(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabledTabs = tabs
      .map((tab, tabIndex) => ({ tab, tabIndex }))
      .filter(({ tab }) => !tab.disabled);
    const currentPosition = enabledTabs.findIndex(({ tabIndex }) => tabIndex === index);
    let nextPosition: number | undefined;
    if (event.key === 'ArrowRight') nextPosition = (currentPosition + 1) % enabledTabs.length;
    if (event.key === 'ArrowLeft') nextPosition = (currentPosition - 1 + enabledTabs.length) % enabledTabs.length;
    if (event.key === 'Home') nextPosition = 0;
    if (event.key === 'End') nextPosition = enabledTabs.length - 1;
    if (nextPosition === undefined) return;

    event.preventDefault();
    const nextIndex = enabledTabs[nextPosition].tabIndex;
    selectTab(enabledTabs[nextPosition].tab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={ariaLabel} className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`${id}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={selected?.id === tab.id}
            aria-controls={`${id}-panel-${tab.id}`}
            tabIndex={selected?.id === tab.id ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => selectTab(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`border-b-2 px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 ${
              selected?.id === tab.id
                ? 'border-blue-700 text-blue-800'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {selected && (
        <div
          id={`${id}-panel-${selected.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${selected.id}`}
          tabIndex={0}
          className="py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          {selected.content}
        </div>
      )}
    </div>
  );
}
