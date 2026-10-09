import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AspectRatio,
  Blockquote,
  Code,
  IconButton,
  Link,
  Separator,
  Spinner,
  ThemeControl,
  ThemeProvider,
  useTheme,
} from '../FoundationPrimitives';

afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.removeProperty('color-scheme');
});

describe('foundation primitives', () => {
  it('renders semantic quotations and inline code', () => {
    const { container } = render(<><Blockquote cite="/source">Quoted guidance</Blockquote><Code>pnpm test</Code></>);
    expect(container.querySelector('blockquote')).toHaveAttribute('cite', '/source');
    expect(container.querySelector('code')).toHaveTextContent('pnpm test');
  });

  it('provides a named icon button and accessible external-link announcement', () => {
    render(<><IconButton label="Close dialog" icon="×" /><Link href="https://example.org" external>Open guide</Link></>);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveAttribute('title', 'Close dialog');
    expect(screen.getByRole('link', { name: /Open guide.*opens in a new tab/ })).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('sets a responsive ratio and exposes a named separator', () => {
    const { container } = render(<><AspectRatio ratio={1}><span>Square</span></AspectRatio><Separator /></>);
    expect(container.querySelector('[style*="aspect-ratio"]')).toHaveStyle({ aspectRatio: '1' });
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('supports controlled and uncontrolled light/dark/system theme changes', () => {
    render(<ThemeProvider defaultTheme="light"><ThemeControl /></ThemeProvider>);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    fireEvent.change(screen.getByRole('combobox', { name: 'Color theme' }), { target: { value: 'dark' } });
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    fireEvent.change(screen.getByRole('combobox', { name: 'Color theme' }), { target: { value: 'system' } });
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('throws clearly if the theme hook is used without a provider', () => {
    function ThemeReadout() {
      const { theme } = useTheme();
      return <span>{theme}</span>;
    }
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ThemeReadout />)).toThrow('useTheme must be used within a ThemeProvider.');
    error.mockRestore();
  });

  it('announces loading status and respects semantic hidden graphic', () => {
    const { container } = render(<Spinner label="Loading report" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading report');
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
