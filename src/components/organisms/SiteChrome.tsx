import { useCallback, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../atoms/Button';
import { Modal } from './Modal';

export interface SiteNavigationLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  brand: string;
  homeHref?: string;
  links?: SiteNavigationLink[];
  actions?: ReactNode;
  position?: 'static' | 'fixed';
  label?: string;
  className?: string;
}

export function SiteHeader({
  brand,
  homeHref = '/',
  links = [],
  actions,
  position = 'static',
  label = 'Main navigation',
  className = '',
}: SiteHeaderProps) {
  return (
    <>
      <header className={`${position === 'fixed' ? 'fixed inset-x-0 top-0 z-40' : 'relative'} border-b border-slate-200 bg-white ${className}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 ${position === 'fixed' ? 'h-16 flex-nowrap' : 'min-h-16 flex-wrap py-3'}`}>
          <a href={homeHref} className="shrink-0 truncate rounded font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-700">
            {brand}
          </a>
          <nav aria-label={label} className={`flex items-center gap-4 ${position === 'fixed' ? 'max-w-[75%] flex-nowrap overflow-x-auto' : 'flex-wrap'}`}>
            {links.map((link) => (
              <a key={`${link.href}-${link.label}`} href={link.href} className="min-h-11 content-center rounded text-sm text-slate-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-blue-700">
                {link.label}
              </a>
            ))}
            {actions}
          </nav>
        </div>
      </header>
      {position === 'fixed' && <div aria-hidden="true" className="h-16" />}
    </>
  );
}

export interface SiteSidebarItem extends SiteNavigationLink {
  current?: boolean;
}

export interface SiteSidebarProps {
  label: string;
  items: SiteSidebarItem[];
  title?: string;
  className?: string;
}

export function SiteSidebar({ label, items, title, className = '' }: SiteSidebarProps) {
  const titleId = useId();

  return (
    <nav
      aria-label={label}
      aria-labelledby={title ? titleId : undefined}
      className={`w-full rounded-lg border border-slate-200 bg-white p-4 ${className}`}
    >
      {title && <h2 id={titleId} className="mb-3 text-sm font-semibold text-slate-900">{title}</h2>}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <a
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={`flex min-h-11 items-center rounded-md px-3 text-sm focus-visible:outline-2 focus-visible:outline-blue-700 ${
                item.current ? 'bg-blue-50 font-semibold text-blue-900' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export interface PopupSidebarProps extends SiteSidebarProps {
  triggerLabel?: string;
  dialogTitle?: string;
}

export function PopupSidebar({
  label,
  items,
  title,
  className = '',
  triggerLabel = 'Open navigation',
  dialogTitle = title ?? label,
}: PopupSidebarProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button type="button" variant="outline" aria-expanded={open} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <Modal
        isOpen={open}
        onClose={close}
        title={dialogTitle}
        className="ml-auto mr-0 h-full max-h-none max-w-sm rounded-l-xl rounded-r-none"
      >
        <SiteSidebar label={label} items={items} title={title} className={`border-0 p-0 shadow-none ${className}`} />
      </Modal>
    </>
  );
}

export interface SiteFooterColumn {
  heading: string;
  links: SiteNavigationLink[];
}

export interface SiteFooterProps {
  brand?: string;
  description?: ReactNode;
  columns?: SiteFooterColumn[];
  links?: SiteNavigationLink[];
  copyright?: string;
  variant?: 'simple' | 'columns' | 'minimal';
  className?: string;
}

export function SiteFooter({
  brand,
  description,
  columns = [],
  links = [],
  copyright,
  variant = 'simple',
  className = '',
}: SiteFooterProps) {
  if (variant === 'minimal') {
    return (
      <footer className={`border-t border-slate-200 bg-white px-4 py-5 ${className}`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-700">
          {brand && <span className="font-semibold text-slate-900">{brand}</span>}
          {links.length > 0 && <nav aria-label="Footer links"><FooterLinks links={links} /></nav>}
          {copyright && <span>{copyright}</span>}
        </div>
      </footer>
    );
  }

  return (
    <footer className={`border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
      <div className={`mx-auto grid max-w-7xl gap-8 ${variant === 'columns' ? 'md:grid-cols-[minmax(12rem,2fr)_3fr]' : ''}`}>
        <div className="max-w-sm space-y-2">
          {brand && <p className="font-semibold text-slate-950">{brand}</p>}
          {description && <div className="text-sm leading-6 text-slate-600">{description}</div>}
        </div>
        {variant === 'columns' && columns.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="mb-2 text-sm font-semibold text-slate-900">{column.heading}</h2>
                <FooterLinks links={column.links} />
              </nav>
            ))}
          </div>
        ) : links.length > 0 ? (
          <nav aria-label="Footer links"><FooterLinks links={links} /></nav>
        ) : null}
        {copyright && <p className="border-t border-slate-200 pt-4 text-sm text-slate-600 md:col-span-full">{copyright}</p>}
      </div>
    </footer>
  );
}

function FooterLinks({ links }: { links: SiteNavigationLink[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <a href={link.href} className="min-h-11 content-center text-sm text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export interface ContentBlockProps {
  title: string;
  children: ReactNode;
  description?: ReactNode;
  headingLevel?: 'h2' | 'h3' | 'h4';
  variant?: 'default' | 'muted' | 'accent' | 'bordered';
  className?: string;
}

export function ContentBlock({
  title,
  children,
  description,
  headingLevel: Heading = 'h2',
  variant = 'default',
  className = '',
}: ContentBlockProps) {
  const headingId = useId();
  const variantClass = {
    default: '',
    muted: 'bg-slate-100',
    accent: 'border-l-4 border-blue-700 bg-blue-50',
    bordered: 'rounded-xl border border-slate-200 bg-white',
  }[variant];

  return (
    <section aria-labelledby={headingId} className={`p-6 sm:p-8 ${variantClass} ${className}`}>
      <Heading id={headingId} className="text-xl font-semibold text-slate-950">{title}</Heading>
      {description && <div className="mt-2 max-w-prose text-slate-700">{description}</div>}
      <div className="mt-5 space-y-4 leading-7 text-slate-800">{children}</div>
    </section>
  );
}
