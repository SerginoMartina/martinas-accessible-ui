import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Input } from '../atoms/Input';
import { Pagination } from '../molecules/Pagination';

export interface DataColumn<Row> {
  id: string;
  header: string;
  accessor: keyof Row | ((row: Row) => unknown);
  render?: (value: unknown, row: Row) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  minWidth?: number;
}

export interface DataTableProps<Row> {
  columns: DataColumn<Row>[];
  data: Row[];
  getRowId: (row: Row) => string;
  pageSize?: number;
  caption: string;
  emptyMessage?: string;
  className?: string;
}

function getValue<Row>(row: Row, accessor: DataColumn<Row>['accessor']): unknown {
  return typeof accessor === 'function' ? accessor(row) : row[accessor];
}

export function DataTable<Row>({
  columns,
  data,
  getRowId,
  pageSize = 10,
  caption,
  emptyMessage = 'No matching rows.',
  className = '',
}: DataTableProps<Row>) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<{ id: string; direction: 'ascending' | 'descending' } | null>(null);
  const [page, setPage] = useState(1);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const resizeCleanup = useRef<(() => void) | null>(null);
  const safePageSize = Math.max(1, Math.floor(pageSize));

  useEffect(() => () => resizeCleanup.current?.(), []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    let rows = data.filter((row) =>
      columns.some((column) => {
        if (column.filterable === false) return false;
        const value = getValue(row, column.accessor);
        return String(value ?? '').toLocaleLowerCase().includes(normalizedQuery);
      }),
    );
    if (sort) {
      const column = columns.find((entry) => entry.id === sort.id);
      if (column) {
        rows = [...rows].sort((left, right) => {
          const leftValue = getValue(left, column.accessor);
          const rightValue = getValue(right, column.accessor);
          const comparison =
            typeof leftValue === 'number' && typeof rightValue === 'number'
              ? leftValue - rightValue
              : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, {
                  numeric: true,
                  sensitivity: 'base',
                });
          return sort.direction === 'ascending' ? comparison : -comparison;
        });
      }
    }
    return rows;
  }, [columns, data, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / safePageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filtered.slice((currentPage - 1) * safePageSize, currentPage * safePageSize);
  const tableMinWidth = columns.reduce(
    (total, column) => total + (widths[column.id] ?? column.width ?? 180),
    0,
  );

  const toggleSort = (column: DataColumn<Row>) => {
    if (column.sortable === false) return;
    setSort((current) => ({
      id: column.id,
      direction: current?.id === column.id && current.direction === 'ascending' ? 'descending' : 'ascending',
    }));
    setPage(1);
  };

  const startResize = (column: DataColumn<Row>, startX: number) => {
    resizeCleanup.current?.();
    const initialWidth = widths[column.id] ?? column.width ?? 180;
    const minimum = column.minWidth ?? 80;
    const onMove = (event: MouseEvent) => {
      setWidths((previous) => ({
        ...previous,
        [column.id]: Math.min(800, Math.max(minimum, initialWidth + event.clientX - startX)),
      }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      resizeCleanup.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    resizeCleanup.current = onUp;
  };

  const resizeByKeyboard = (column: DataColumn<Row>, amount: number) => {
    setWidths((previous) => ({
      ...previous,
      [column.id]: Math.min(
        800,
        Math.max(column.minWidth ?? 80, (previous[column.id] ?? column.width ?? 180) + amount),
      ),
    }));
  };

  return (
    <section className={`space-y-4 ${className}`}>
      <div className="max-w-sm">
        <Input
          type="search"
          label="Filter rows"
          placeholder="Search all columns"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="max-h-[28rem] overflow-auto rounded-lg border border-slate-200">
        <table style={{ minWidth: tableMinWidth }} className="w-full table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="sticky top-0 z-[1] bg-slate-100 text-slate-800">
            <tr>
              {columns.map((column) => {
                const width = widths[column.id] ?? column.width ?? 180;
                const style: CSSProperties = { width };
                return (
                  <th
                    key={column.id}
                    scope="col"
                    style={style}
                    aria-sort={sort?.id === column.id ? sort.direction : 'none'}
                    className="relative border-b border-slate-200 px-4 py-3 font-semibold"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(column)}
                      disabled={column.sortable === false}
                      className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-default"
                    >
                      {column.header}
                      {column.sortable !== false && (
                        <span aria-hidden="true" className="ml-2 text-xs text-slate-500">
                          {sort?.id === column.id ? (sort.direction === 'ascending' ? '↑' : '↓') : '↕'}
                        </span>
                      )}
                    </button>
                    <span
                      role="separator"
                      aria-label={`Resize ${column.header} column`}
                      aria-orientation="vertical"
                      aria-valuemin={column.minWidth ?? 80}
                      aria-valuemax={800}
                      aria-valuenow={width}
                      tabIndex={0}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        startResize(column, event.clientX);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                          event.preventDefault();
                          resizeByKeyboard(column, event.key === 'ArrowRight' ? 16 : -16);
                        }
                      }}
                      className="absolute right-0 top-0 h-full w-2 cursor-col-resize touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {visibleRows.length > 0 ? (
              visibleRows.map((row) => (
                <tr key={getRowId(row)} className="hover:bg-slate-50">
                  {columns.map((column) => {
                    const value = getValue(row, column.accessor);
                    return (
                      <td
                        key={column.id}
                        className="truncate px-4 py-3 text-slate-700"
                        title={typeof value === 'string' ? value : undefined}
                      >
                        {column.render ? column.render(value, row) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-slate-600">
          {filtered.length === 0
            ? 'No results'
            : `Showing ${(currentPage - 1) * safePageSize + 1}–${Math.min(currentPage * safePageSize, filtered.length)} of ${filtered.length}`}
        </p>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  );
}
