import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): 'light' | 'dark' {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  theme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

export function ThemeProvider({ children, defaultTheme = 'system', theme: controlledTheme, onThemeChange }: ThemeProviderProps) {
  const [uncontrolledTheme, setUncontrolledTheme] = useState(defaultTheme);
  const theme = controlledTheme ?? uncontrolledTheme;
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemTheme(media.matches ? 'dark' : 'light');
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    return () => {
      delete root.dataset.theme;
      root.style.removeProperty('color-scheme');
    };
  }, [resolvedTheme]);

  const setTheme = (nextTheme: ThemeMode) => {
    if (controlledTheme === undefined) setUncontrolledTheme(nextTheme);
    onThemeChange?.(nextTheme);
  };

  const context = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);
  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider.');
  return context;
}

export function ThemeControl({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <label className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}>
      Color theme
      <select
        aria-label="Color theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value as ThemeMode)}
        className="min-h-10 rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        <option value="system">Use system setting</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'main' | 'section' | 'article' | 'header' | 'footer';
  children: ReactNode;
}

export function Container({ as: Element = 'div', className = '', ...props }: LayoutProps) {
  return <Element {...props} className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} />;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section';
  gap?: number;
  children: ReactNode;
}

export function Stack({ as: Element = 'div', gap = 4, className = '', style, ...props }: StackProps) {
  return <Element {...props} className={`flex flex-col ${className}`} style={{ ...style, gap: `${gap * 0.25}rem` } as CSSProperties} />;
}

export interface ClusterProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  children: ReactNode;
}

export function Cluster({ gap = 3, className = '', style, ...props }: ClusterProps) {
  return <div {...props} className={`flex flex-wrap items-center ${className}`} style={{ ...style, gap: `${gap * 0.25}rem` }} />;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  minItemWidth?: string;
  gap?: number;
  children: ReactNode;
}

export function Grid({ minItemWidth = '16rem', gap = 4, className = '', style, ...props }: GridProps) {
  return (
    <div
      {...props}
      className={className}
      style={{ ...style, display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))`, gap: `${gap * 0.25}rem` }}
    />
  );
}

export interface InsetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  space?: number;
}

export function Inset({ children, space = 4, className = '', style, ...props }: InsetProps) {
  return <div {...props} className={className} style={{ ...style, padding: `${space * 0.25}rem` }}>{children}</div>;
}

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children: ReactNode;
}

export function AspectRatio({ ratio = 16 / 9, children, className = '', style, ...props }: AspectRatioProps) {
  return <div {...props} className={`relative w-full overflow-hidden ${className}`} style={{ ...style, aspectRatio: ratio }}>{children}</div>;
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'section' | 'div';
  children: ReactNode;
  title?: string;
}

export function Card({ as: Element = 'article', children, title, className = '', ...props }: CardProps) {
  return (
    <Element {...props} aria-label={props['aria-label'] ?? title} className={`rounded-xl border border-slate-200 bg-surface text-secondary shadow-sm ${className}`}>
      {children}
    </Element>
  );
}

type QuotationProps = HTMLAttributes<HTMLQuoteElement> & { children?: ReactNode; cite?: string };

export function Blockquote({ children, cite, className = '', ...props }: QuotationProps) {
  const attributes = { ...props, cite, className: `border-l-4 border-blue-700 pl-4 text-lg italic leading-7 text-slate-800 ${className}` };
  return <blockquote {...attributes}>{children}</blockquote>;
}

export function Quote({ children, cite, className = '', ...props }: QuotationProps) {
  const attributes = { ...props, cite, className: `italic text-slate-800 ${className}` };
  return <q {...attributes}>{children}</q>;
}

export function Code({ children, className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <code {...props} className={`rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900 ${className}`}>{children}</code>;
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  external?: boolean;
}

export function Link({ href, external = false, children, className = '', ...props }: LinkProps) {
  return (
    <a
      {...props}
      href={href}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      className={`text-blue-800 underline decoration-blue-300 underline-offset-4 hover:text-blue-950 focus-visible:outline-2 focus-visible:outline-blue-700 ${className}`}
    >
      {children}{external && <span className="sr-only">{' '}(opens in a new tab)</span>}
    </a>
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
}

export function IconButton({ label, icon, className = '', ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      aria-label={label}
      title={props.title ?? label}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-400 bg-white p-2 text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

export interface IconLinkProps extends Omit<LinkProps, 'children'> {
  icon: ReactNode;
  children: ReactNode;
}

export function LinkWithIcon({ icon, children, className = '', ...props }: IconLinkProps) {
  return <Link {...props} className={`inline-flex items-center gap-2 ${className}`}><span aria-hidden="true">{icon}</span><span>{children}</span></Link>;
}

export interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  children: ReactNode;
}

export function ButtonWithIcon({ icon, children, className = '', ...props }: ButtonWithIconProps) {
  return <button {...props} type={props.type ?? 'button'} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:opacity-50 ${className}`}><span aria-hidden="true">{icon}</span>{children}</button>;
}

export function Separator({ decorative = false, orientation = 'horizontal', className = '' }: { decorative?: boolean; orientation?: 'horizontal' | 'vertical'; className?: string }) {
  return (
    <div
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={`${orientation === 'horizontal' ? 'h-px w-full' : 'h-full min-h-6 w-px'} bg-slate-300 ${className}`}
    />
  );
}

export function Spinner({ label = 'Loading', className = '' }: { label?: string; className?: string }) {
  return (
    <span role="status" className={`inline-flex items-center gap-2 text-sm text-slate-700 ${className}`}>
      <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-700 motion-reduce:animate-none" />
      <span>{label}</span>
    </span>
  );
}
