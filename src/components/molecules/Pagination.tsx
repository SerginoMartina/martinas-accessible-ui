import type { ButtonHTMLAttributes } from 'react';
import { Button } from '../atoms/Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function getPageItems(currentPage: number, totalPages: number, siblingCount: number): PageItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const start = Math.max(2, currentPage - siblingCount);
  const end = Math.min(totalPages - 1, currentPage + siblingCount);
  const items: PageItem[] = [1];

  if (start > 2) items.push('start-ellipsis');
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < totalPages - 1) items.push('end-ellipsis');
  items.push(totalPages);

  return items;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}: PaginationProps) {
  const pageCount = Math.max(1, Math.floor(totalPages));
  const page = Math.min(pageCount, Math.max(1, Math.floor(currentPage)));
  const siblings = Math.max(0, Math.floor(siblingCount));
  const items = getPageItems(page, pageCount, siblings);
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = { type: 'button' };

  return (
    <nav aria-label="Pagination" className={`flex flex-wrap items-center gap-1 ${className}`}>
      <Button
        {...buttonProps}
        variant="outline"
        size="sm"
        disabled={page <= 1}
        aria-label="Go to previous page"
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      {items.map((item) =>
        typeof item === 'number' ? (
          <Button
            {...buttonProps}
            key={item}
            variant={item === page ? 'primary' : 'ghost'}
            size="sm"
            aria-label={`Go to page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ) : (
          <span key={item} aria-label="Pages omitted" className="px-2 text-slate-500">
            …
          </span>
        ),
      )}
      <Button
        {...buttonProps}
        variant="outline"
        size="sm"
        disabled={page >= pageCount}
        aria-label="Go to next page"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
