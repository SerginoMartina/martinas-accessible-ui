export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  label?: string;
  className?: string;
}

export function Breadcrumbs({
  items,
  label = 'Breadcrumb',
  className = '',
}: BreadcrumbsProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-slate-400">/</span>}
              {item.href && !current ? (
                <a href={item.href} className="rounded text-blue-800 underline underline-offset-2 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
                  {item.label}
                </a>
              ) : (
                <span aria-current={current ? 'page' : undefined} className={current ? 'font-medium text-slate-900' : 'text-slate-700'}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
