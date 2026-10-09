import { cloneElement, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { HTMLAttributes, ReactElement } from 'react';

type TooltipTriggerProps = HTMLAttributes<HTMLElement> & { tabIndex?: number };

export interface TooltipProps {
  content: string;
  children: ReactElement<TooltipTriggerProps>;
  side?: 'top' | 'bottom';
  className?: string;
}

interface Position {
  top: number;
  left: number;
  side: 'top' | 'bottom';
}

export function Tooltip({ content, children, side = 'top', className = '' }: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const existingTriggerProps = children.props;
  const describedBy = [existingTriggerProps['aria-describedby'], visible ? id : undefined]
    .filter(Boolean)
    .join(' ') || undefined;
  const trigger = cloneElement(children, {
    tabIndex: existingTriggerProps.tabIndex ?? 0,
    'aria-describedby': describedBy,
    onFocus: (event) => {
      existingTriggerProps.onFocus?.(event);
      setVisible(true);
    },
    onBlur: (event) => {
      existingTriggerProps.onBlur?.(event);
      setVisible(false);
    },
    onMouseEnter: (event) => {
      existingTriggerProps.onMouseEnter?.(event);
      setVisible(true);
    },
    onMouseLeave: (event) => {
      existingTriggerProps.onMouseLeave?.(event);
      setVisible(false);
    },
    onKeyDown: (event) => {
      existingTriggerProps.onKeyDown?.(event);
      if (event.key === 'Escape') setVisible(false);
    },
  });

  useLayoutEffect(() => {
    if (!visible) return;
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const updatePosition = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const margin = 8;
      const actualSide =
        side === 'top' && triggerRect.top < tooltipRect.height + margin ? 'bottom' :
        side === 'bottom' && window.innerHeight - triggerRect.bottom < tooltipRect.height + margin ? 'top' :
        side;
      const top = actualSide === 'top'
        ? triggerRect.top - tooltipRect.height - margin
        : triggerRect.bottom + margin;
      const clampedTop = Math.max(
        margin,
        Math.min(top, window.innerHeight - tooltipRect.height - margin),
      );
      const left = Math.max(
        margin,
        Math.min(
          triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
          window.innerWidth - tooltipRect.width - margin,
        ),
      );
      setPosition({ top: clampedTop, left, side: actualSide });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [side, visible, content]);

  return (
    <>
      <span ref={triggerRef} className={`inline-flex rounded focus-within:outline focus-within:outline-2 focus-within:outline-blue-700 ${className}`}>
        {trigger}
      </span>
      {visible && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          id={id}
          role="tooltip"
          className="pointer-events-none fixed z-[100] max-h-[70vh] max-w-xs overflow-y-auto rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
          style={position ? { top: position.top, left: position.left } : { top: -10000, left: -10000 }}
          data-side={position?.side ?? side}
        >
          {content}
        </div>,
        document.body,
      )}
    </>
  );
}
