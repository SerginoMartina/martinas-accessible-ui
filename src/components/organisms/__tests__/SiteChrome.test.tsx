import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContentBlock, PopupSidebar, SiteFooter, SiteHeader, SiteSidebar } from '../SiteChrome';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Components', href: '#components', current: true },
];

describe('site layout components', () => {
  it('renders static and fixed named site navigation and reserves space for fixed positioning', () => {
    const { rerender, container } = render(<SiteHeader brand="Studio" links={links} />);
    expect(screen.getByRole('link', { name: 'Studio' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(container.querySelector('header')).toHaveClass('relative');

    rerender(<SiteHeader brand="Studio" position="fixed" links={links} />);
    expect(container.querySelector('header')).toHaveClass('fixed');
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass('h-16');
  });

  it('exposes a labelled sidebar and current-page navigation item', () => {
    render(<SiteSidebar label="Section navigation" title="On this page" items={links} />);
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('aria-current', 'page');
  });

  it('opens the popup sidebar as a focus-managed dialog and restores focus when dismissed', async () => {
    render(<PopupSidebar label="Site navigation" title="Explore" items={links} />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Explore' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Explore' })).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: 'Close Modal' });
    await waitFor(() => expect(closeButton).toHaveFocus());

    fireEvent.keyDown(closeButton, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Explore' })).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('renders simple, grouped, and minimal footers with named navigation', () => {
    const { rerender } = render(<SiteFooter brand="Studio" links={links} copyright="© 2026 Studio" />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 2026 Studio');
    expect(screen.getByRole('navigation', { name: 'Footer links' })).toBeInTheDocument();

    rerender(<SiteFooter variant="columns" columns={[{ heading: 'Resources', links }]} />);
    expect(screen.getByRole('navigation', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getAllByRole('navigation', { name: 'Resources' })).toHaveLength(1);

    rerender(<SiteFooter variant="minimal" brand="Studio" links={links} />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Studio');
    expect(screen.getByRole('navigation', { name: 'Footer links' })).toBeInTheDocument();
  });

  it('renders a labelled content section with its selected visual treatment', () => {
    render(<ContentBlock title="Helpful details" description="Introductory text" variant="accent"><p>Section content</p></ContentBlock>);
    expect(screen.getByRole('region', { name: 'Helpful details' })).toHaveClass('border-l-4');
    expect(screen.getByText('Introductory text')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });
});
