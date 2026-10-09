import { useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface TreeItemData {
  id: string;
  label: string;
  children?: TreeItemData[];
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TreeViewProps {
  items: TreeItemData[];
  label: string;
  selectedId?: string;
  defaultSelectedId?: string;
  onSelect?: (item: TreeItemData) => void;
  defaultExpandedIds?: string[];
  className?: string;
}

interface VisibleItem {
  item: TreeItemData;
  level: number;
  parentId?: string;
}

function flattenVisibleItems(
  items: TreeItemData[],
  expandedIds: Set<string>,
  level = 1,
  parentId?: string,
): VisibleItem[] {
  return items.flatMap((item) => {
    const visible: VisibleItem = { item, level, parentId };
    return [
      visible,
      ...(item.children && expandedIds.has(item.id)
        ? flattenVisibleItems(item.children, expandedIds, level + 1, item.id)
        : []),
    ];
  });
}

export function TreeView({
  items,
  label,
  selectedId,
  defaultSelectedId,
  onSelect,
  defaultExpandedIds = [],
  className = '',
}: TreeViewProps) {
  const id = useId();
  const [expandedIds, setExpandedIds] = useState(() => new Set(defaultExpandedIds));
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState(defaultSelectedId);
  const nodeRefs = useRef(new Map<string, HTMLLIElement>());
  const visibleItems = useMemo(() => flattenVisibleItems(items, expandedIds), [items, expandedIds]);
  const activeSelectedId = selectedId ?? uncontrolledSelectedId;
  const activeTabStopId = visibleItems.some(({ item }) => item.id === activeSelectedId)
    ? activeSelectedId
    : visibleItems[0]?.item.id;

  const focusItem = (id: string) => nodeRefs.current.get(id)?.focus();

  const toggleExpanded = (item: TreeItemData) => {
    if (!item.children?.length) return;
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(item.id)) next.delete(item.id);
      else next.add(item.id);
      return next;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, entry: VisibleItem) => {
    const index = visibleItems.findIndex(({ item }) => item.id === entry.item.id);
    const item = entry.item;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = visibleItems[index + 1];
      if (next) focusItem(next.item.id);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const previous = visibleItems[index - 1];
      if (previous) focusItem(previous.item.id);
    } else if (event.key === 'Home') {
      event.preventDefault();
      if (visibleItems[0]) focusItem(visibleItems[0].item.id);
    } else if (event.key === 'End') {
      event.preventDefault();
      const last = visibleItems[visibleItems.length - 1];
      if (last) focusItem(last.item.id);
    } else if (event.key === 'ArrowRight') {
      if (item.children?.length && !expandedIds.has(item.id)) {
        event.preventDefault();
        toggleExpanded(item);
      } else if (item.children?.length) {
        event.preventDefault();
        focusItem(item.children[0].id);
      }
    } else if (event.key === 'ArrowLeft') {
      if (item.children?.length && expandedIds.has(item.id)) {
        event.preventDefault();
        toggleExpanded(item);
      } else if (entry.parentId) {
        event.preventDefault();
        focusItem(entry.parentId);
      }
    } else if ((event.key === 'Enter' || event.key === ' ') && !item.disabled) {
      event.preventDefault();
      if (selectedId === undefined) setUncontrolledSelectedId(item.id);
      onSelect?.(item);
    }
  };

  const renderItems = (nodes: TreeItemData[], level: number): ReactNode =>
    nodes.map((item) => {
      const hasChildren = Boolean(item.children?.length);
      const expanded = expandedIds.has(item.id);
      const entry = visibleItems.find(({ item: visible }) => visible.id === item.id);
      return (
        <li
          key={item.id}
          ref={(element) => {
            if (element) nodeRefs.current.set(item.id, element);
            else nodeRefs.current.delete(item.id);
          }}
          id={`${id}-${item.id}`}
          role="treeitem"
          tabIndex={activeTabStopId === item.id ? 0 : -1}
          aria-labelledby={`${id}-${item.id}-label`}
          aria-level={level}
          aria-expanded={hasChildren ? expanded : undefined}
          aria-selected={activeSelectedId === item.id}
          aria-disabled={item.disabled || undefined}
          onClick={(event) => {
            event.stopPropagation();
            if (item.disabled) return;
            if (selectedId === undefined) setUncontrolledSelectedId(item.id);
            onSelect?.(item);
            if (hasChildren) toggleExpanded(item);
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (entry) handleKeyDown(event, entry);
          }}
          className="list-none"
        >
          <div
            className={`flex min-h-10 cursor-pointer items-center gap-2 rounded px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
              activeSelectedId === item.id ? 'bg-blue-50 font-medium text-blue-950' : 'text-slate-800 hover:bg-slate-50'
            } ${item.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <span aria-hidden="true" className="w-4 text-center text-slate-500">
              {hasChildren ? (expanded ? '⌄' : '›') : ''}
            </span>
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            <span id={`${id}-${item.id}-label`}>{item.label}</span>
          </div>
          {hasChildren && expanded && (
            <ul role="group" className="ml-5 border-l border-slate-200 pl-2">
              {renderItems(item.children ?? [], level + 1)}
            </ul>
          )}
        </li>
      );
    });

  return (
    <ul
      id={`${id}-tree`}
      role="tree"
      aria-label={label}
      className={`space-y-1 ${className}`}
      onFocus={(event) => {
        if (event.target === event.currentTarget) {
          const first = visibleItems[0];
          if (first) focusItem(first.item.id);
        }
      }}
    >
      {renderItems(items, 1)}
    </ul>
  );
}
