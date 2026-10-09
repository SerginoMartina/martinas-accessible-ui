import { useId } from 'react';
import type { ReactNode } from 'react';

export interface ContentAction {
  label: string;
  href: string;
}

export interface HeroProps {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  actions?: ContentAction[];
  image?: { src: string; alt: string };
  headingLevel?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function Hero({
  title,
  description,
  eyebrow,
  actions = [],
  image,
  headingLevel: Heading = 'h1',
  className = '',
}: HeroProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={`grid gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 md:items-center md:p-12 ${className}`}
    >
      <div>
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-800">{eyebrow}</p>}
        <Heading id={headingId} className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</Heading>
        {description && <div className="mt-4 max-w-prose text-base leading-7 text-slate-700">{description}</div>}
        {actions.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <li key={`${action.href}-${action.label}`}>
                <a
                  href={action.href}
                  className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    index === 0 ? 'bg-blue-700 text-white hover:bg-blue-800' : 'border border-slate-400 bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {action.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-80 w-full rounded-xl object-cover"
        />
      )}
    </section>
  );
}

export interface ContentListItem {
  id: string;
  content: ReactNode;
}

export interface ContentListProps {
  items: ContentListItem[];
  ordered?: boolean;
  label?: string;
  className?: string;
}

export function ContentList({ items, ordered = false, label, className = '' }: ContentListProps) {
  const ListElement = ordered ? 'ol' : 'ul';

  return (
    <ListElement
      aria-label={label}
      className={`${ordered ? 'list-decimal' : 'list-disc'} space-y-2 pl-6 text-slate-800 marker:text-blue-700 ${className}`}
    >
      {items.map((item) => <li key={item.id}>{item.content}</li>)}
    </ListElement>
  );
}

export interface ArticleProps {
  title: string;
  children: ReactNode;
  eyebrow?: string;
  author?: string;
  published?: { dateTime: string; label: string };
  image?: { src: string; alt: string; caption?: ReactNode };
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function Article({
  title,
  children,
  eyebrow,
  author,
  published,
  image,
  headingLevel: Heading = 'h2',
  className = '',
}: ArticleProps) {
  const headingId = useId();

  return (
    <article aria-labelledby={headingId} className={`max-w-prose rounded-xl border border-slate-200 bg-white p-6 ${className}`}>
      {image && (
        <figure className="mb-6">
          <img src={image.src} alt={image.alt} loading="lazy" className="max-h-96 w-full rounded-lg object-cover" />
          {image.caption && <figcaption className="mt-2 text-sm leading-6 text-slate-600">{image.caption}</figcaption>}
        </figure>
      )}
      <header>
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">{eyebrow}</p>}
        <Heading id={headingId} className="mt-2 text-2xl font-semibold text-slate-950">{title}</Heading>
        {(author || published) && (
          <p className="mt-2 text-sm text-slate-600">
            {author && <span>By {author}</span>}
            {author && published && <span aria-hidden="true"> · </span>}
            {published && <time dateTime={published.dateTime}>{published.label}</time>}
          </p>
        )}
      </header>
      <div className="mt-5 space-y-4 leading-7 text-slate-700">{children}</div>
    </article>
  );
}

export interface LinkListItem {
  href: string;
  label: string;
  description?: string;
}

export interface LinkListProps {
  label: string;
  links: LinkListItem[];
  className?: string;
}

export function LinkList({ label, links, className = '' }: LinkListProps) {
  const id = useId();

  return (
    <nav aria-label={label} className={className}>
      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {links.map((link, index) => (
          <li key={`${link.href}-${link.label}`}>
            <a
              href={link.href}
              aria-labelledby={`${id}-label-${index}`}
              aria-describedby={link.description ? `${id}-description-${index}` : undefined}
              className="block rounded-md px-4 py-3 text-blue-800 underline decoration-blue-300 underline-offset-4 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              <span id={`${id}-label-${index}`} className="font-medium">{link.label}</span>
              {link.description && <span id={`${id}-description-${index}`} className="mt-1 block text-sm leading-5 text-slate-600">{link.description}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export interface IconListItem {
  id: string;
  icon: ReactNode;
  title: string;
  description?: ReactNode;
}

export interface IconListProps {
  items: IconListItem[];
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function IconList({ items, headingLevel: Heading = 'h3', className = '' }: IconListProps) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-800">
            {item.icon}
          </span>
          <div>
            <Heading className="font-semibold text-slate-950">{item.title}</Heading>
            {item.description && <div className="mt-1 text-sm leading-6 text-slate-700">{item.description}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface CTABannerProps {
  title: string;
  description?: ReactNode;
  action: ContentAction;
  secondaryAction?: ContentAction;
  headingLevel?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CTABanner({ title, description, action, secondaryAction, headingLevel: Heading = 'h2', className = '' }: CTABannerProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={`flex flex-col gap-5 rounded-xl bg-slate-900 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8 ${className}`}
    >
      <div className="max-w-2xl">
        <Heading id={headingId} className="text-2xl font-semibold">{title}</Heading>
        {description && <div className="mt-2 leading-6 text-slate-200">{description}</div>}
      </div>
      <ul className="flex shrink-0 flex-wrap gap-3">
        {[action, ...(secondaryAction ? [secondaryAction] : [])].map((item, index) => (
          <li key={`${item.href}-${item.label}`}>
            <a
              href={item.href}
              className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                index === 0 ? 'bg-white text-slate-950 hover:bg-slate-100' : 'border border-slate-300 text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
