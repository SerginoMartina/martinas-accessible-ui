import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from '../atoms/Button';

export interface DateRange {
  startDate: Date;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  label: string;
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (range: DateRange | null) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const monthNames = Array.from({ length: 12 }, (_, month) =>
  new Intl.DateTimeFormat(undefined, { month: 'long' }).format(new Date(2024, month, 1)),
);
const weekdayNames = Array.from({ length: 7 }, (_, day) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(2024, 0, day + 1)),
);

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function dateValue(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export function DateRangePicker({
  label,
  value,
  defaultValue = null,
  onChange,
  minDate,
  maxDate,
  className = '',
}: DateRangePickerProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<DateRange | null>(defaultValue);
  const selectedRange = value === undefined ? uncontrolledValue : value;
  const initialDate = selectedRange?.startDate ?? new Date();
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [focusedDate, setFocusedDate] = useState(() => new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate()));
  const [open, setOpen] = useState(false);
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 121 }, (_, index) => currentYear - 100 + index);
  }, []);

  const calendarDays = useMemo(() => {
    const first = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const mondayOffset = (first.getDay() + 6) % 7;
    const gridStart = new Date(first.getFullYear(), first.getMonth(), 1 - mondayOffset);
    return Array.from({ length: 42 }, (_, index) =>
      new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index),
    );
  }, [visibleMonth]);

  useEffect(() => {
    if (open) dayRefs.current.get(dateKey(focusedDate))?.focus();
  }, [calendarDays, focusedDate, open]);

  const isDisabled = (date: Date) =>
    Boolean(
      (minDate && dateValue(date) < dateValue(minDate)) ||
      (maxDate && dateValue(date) > dateValue(maxDate)),
    );

  const updateRange = (nextRange: DateRange | null) => {
    if (value === undefined) setUncontrolledValue(nextRange);
    onChange?.(nextRange);
  };

  const selectDate = (date: Date) => {
    if (isDisabled(date)) return;
    if (!selectedRange || selectedRange.endDate || dateValue(date) < dateValue(selectedRange.startDate)) {
      updateRange({ startDate: date, endDate: null });
    } else {
      updateRange({ startDate: selectedRange.startDate, endDate: date });
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const changeMonth = (amount: number) => {
    const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1);
    const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
    setVisibleMonth(nextMonth);
    setFocusedDate((current) =>
      new Date(nextMonth.getFullYear(), nextMonth.getMonth(), Math.min(current.getDate(), lastDay)),
    );
  };

  const changeVisibleMonth = (year: number, month: number) => {
    const nextMonth = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    setVisibleMonth(nextMonth);
    setFocusedDate((current) => new Date(year, month, Math.min(current.getDate(), lastDay)));
  };

  const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    let offset = 0;
    if (event.key === 'ArrowLeft') offset = -1;
    else if (event.key === 'ArrowRight') offset = 1;
    else if (event.key === 'ArrowUp') offset = -7;
    else if (event.key === 'ArrowDown') offset = 7;
    else if (event.key === 'Home') offset = -((date.getDay() + 6) % 7);
    else if (event.key === 'End') offset = 6 - ((date.getDay() + 6) % 7);
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const delta = event.key === 'PageUp' ? (event.shiftKey ? -12 : -1) : (event.shiftKey ? 12 : 1);
      const month = new Date(date.getFullYear(), date.getMonth() + delta, 1);
      const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      const next = new Date(month.getFullYear(), month.getMonth(), Math.min(date.getDate(), lastDay));
      setFocusedDate(next);
      setVisibleMonth(new Date(next.getFullYear(), next.getMonth(), 1));
      return;
    }
    else return;

    event.preventDefault();
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
    setFocusedDate(next);
    setVisibleMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const rangeText = selectedRange
    ? `${formatDate(selectedRange.startDate)} – ${selectedRange.endDate ? formatDate(selectedRange.endDate) : 'Choose end date'}`
    : 'Choose date range';

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <span id={`${id}-label`} className="mb-1 block text-sm font-medium text-slate-800">{label}</span>
      <Button
        ref={triggerRef}
        variant="outline"
        className="w-full justify-between"
        aria-haspopup="dialog"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-expanded={open}
        aria-controls={`${id}-calendar`}
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) {
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        <span id={`${id}-value`}>{rangeText}</span>
        <span aria-hidden="true">▦</span>
      </Button>

      {open && (
        <div
          id={`${id}-calendar`}
          role="dialog"
          aria-labelledby={`${id}-label`}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
              }
            }}
            className="absolute z-20 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" aria-label="Previous month" onClick={() => changeMonth(-1)}>‹</Button>
            <div className="flex gap-2">
              <label className="sr-only" htmlFor={`${id}-month`}>Month</label>
              <select
                id={`${id}-month`}
                value={visibleMonth.getMonth()}
                onChange={(event) => changeVisibleMonth(visibleMonth.getFullYear(), Number(event.target.value))}
                className="rounded border border-slate-300 px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {monthNames.map((month, index) => <option key={month} value={index}>{month}</option>)}
              </select>
              <label className="sr-only" htmlFor={`${id}-year`}>Year</label>
              <select
                id={`${id}-year`}
                value={visibleMonth.getFullYear()}
                onChange={(event) => changeVisibleMonth(Number(event.target.value), visibleMonth.getMonth())}
                className="rounded border border-slate-300 px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <Button variant="ghost" size="sm" aria-label="Next month" onClick={() => changeMonth(1)}>›</Button>
          </div>

          <div role="grid" aria-label={monthNames[visibleMonth.getMonth()] + ` ${visibleMonth.getFullYear()}`}>
            <div role="row" className="grid grid-cols-7">
              {weekdayNames.map((weekday) => (
                <span key={weekday} role="columnheader" className="py-2 text-center text-xs font-semibold text-slate-500">
                  {weekday}
                </span>
              ))}
            </div>
            {Array.from({ length: 6 }, (_, row) => (
              <div key={row} role="row" className="grid grid-cols-7">
                {calendarDays.slice(row * 7, row * 7 + 7).map((date) => {
                  const isStart = selectedRange && dateKey(date) === dateKey(selectedRange.startDate);
                  const isEnd = selectedRange?.endDate && dateKey(date) === dateKey(selectedRange.endDate);
                  const inRange = selectedRange?.endDate &&
                    dateValue(date) >= dateValue(selectedRange.startDate) &&
                    dateValue(date) <= dateValue(selectedRange.endDate);
                  const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
                  return (
                    <div key={dateKey(date)} role="gridcell" aria-selected={Boolean(isStart || isEnd || inRange)}>
                      <button
                        ref={(element) => {
                          if (element) dayRefs.current.set(dateKey(date), element);
                          else dayRefs.current.delete(dateKey(date));
                        }}
                        type="button"
                        aria-label={formatDate(date)}
                        aria-current={dateKey(date) === dateKey(new Date()) ? 'date' : undefined}
                        disabled={isDisabled(date)}
                        tabIndex={dateKey(date) === dateKey(focusedDate) ? 0 : -1}
                        onFocus={() => setFocusedDate((current) =>
                          dateKey(current) === dateKey(date) ? current : date,
                        )}
                        onKeyDown={(event) => handleDayKeyDown(event, date)}
                        onClick={() => selectDate(date)}
                        className={`h-9 w-9 rounded-full text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-30 ${
                          isStart || isEnd ? 'bg-blue-700 text-white' :
                          inRange ? 'rounded-none bg-blue-100 text-blue-900' :
                          isCurrentMonth ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p aria-live="polite" className="mt-3 text-sm text-slate-600">{rangeText}</p>
        </div>
      )}
    </div>
  );
}
