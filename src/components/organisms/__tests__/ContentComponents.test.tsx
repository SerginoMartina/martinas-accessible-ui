import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Article, ContentList, CTABanner, Hero, IconList, LinkList } from '../ContentComponents';

describe('Hero', () => {
  it('uses a labelled section, configurable heading, descriptive links, and image alternative text', () => {
    render(
      <Hero
        title="Welcome"
        headingLevel="h2"
        description="Explore the accessible component library."
        actions={[{ label: 'Browse components', href: '#components' }]}
        image={{ src: '/example.png', alt: 'A sample interface preview' }}
      />,
    );

    expect(screen.getByRole('region', { name: 'Welcome' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Welcome', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse components' })).toHaveAttribute('href', '#components');
    expect(screen.getByRole('img', { name: 'A sample interface preview' })).toBeInTheDocument();
  });
});

describe('ContentList', () => {
  it('renders ordered content with native list semantics and a supplied name', () => {
    render(
      <ContentList
        ordered
        label="Setup steps"
        items={[
          { id: 'one', content: 'Install dependencies' },
          { id: 'two', content: 'Run the app' },
        ]}
      />,
    );

    expect(screen.getByRole('list', { name: 'Setup steps' }).tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('Article', () => {
  it('exposes article semantics and machine-readable publication metadata', () => {
    render(
      <Article
        title="Accessible content"
        author="Avery"
        published={{ dateTime: '2026-10-09', label: 'October 9, 2026' }}
        image={{ src: '/article.png', alt: 'A status message illustration', caption: 'A visible image caption.' }}
      >
        <p>Readable text.</p>
      </Article>,
    );

    expect(screen.getByRole('article', { name: 'Accessible content' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'A status message illustration' })).toBeInTheDocument();
    expect(screen.getByText('A visible image caption.')).toBeInTheDocument();
    expect(screen.getByText('October 9, 2026').closest('time')).toHaveAttribute('datetime', '2026-10-09');
  });
});

describe('LinkList', () => {
  it('groups descriptive links in a named navigation landmark', () => {
    render(<LinkList label="Related pages" links={[{ href: '/guide', label: 'Guide', description: 'Read the guide' }]} />);

    expect(screen.getByRole('navigation', { name: 'Related pages' })).toBeInTheDocument();
    const guide = screen.getByRole('link', { name: 'Guide' });
    expect(guide).toHaveAttribute('href', '/guide');
    expect(guide).toHaveAccessibleDescription('Read the guide');
  });
});

describe('IconList', () => {
  it('provides visible text while hiding decorative icons from the accessibility tree', () => {
    const { container } =     render(<IconList headingLevel="h4" items={[{ id: 'keyboard', icon: '⌨', title: 'Keyboard support', description: 'Works without a pointer.' }]} />);

    expect(screen.getByRole('heading', { name: 'Keyboard support', level: 4 })).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('⌨');
  });
});

describe('CTABanner', () => {
  it('names the banner and exposes primary and secondary actions as links', () => {
    render(
      <CTABanner
        title="Explore the library"
        headingLevel="h3"
        action={{ label: 'Browse components', href: '/components' }}
        secondaryAction={{ label: 'Read the guide', href: '/guide' }}
      />,
    );

    expect(screen.getByRole('region', { name: 'Explore the library' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Explore the library', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse components' })).toHaveAttribute('href', '/components');
    expect(screen.getByRole('link', { name: 'Read the guide' })).toHaveAttribute('href', '/guide');
  });
});
