import type { Meta, StoryObj } from '@storybook/react';
import { Article, ContentList, CTABanner, Hero, IconList, LinkList } from './ContentComponents';

const meta: Meta = { title: 'Content patterns', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const PageHero: Story = {
  render: () => (
    <Hero
      eyebrow="Accessible by design"
      title="Build experiences everyone can use"
      description="A concise introduction helps visitors understand the purpose of the page and choose a useful next step."
      actions={[
        { label: 'Explore the library', href: '#library' },
        { label: 'Read the guide', href: '#guide' },
      ]}
      image={{
        src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 400%22%3E%3Crect width=%22640%22 height=%22400%22 fill=%22%23e0f2fe%22/%3E%3Cpath d=%22M0 310h640v90H0z%22 fill=%22%23bfdbfe%22/%3E%3Crect x=%22100%22 y=%22105%22 width=%22440%22 height=%22200%22 rx=%2218%22 fill=%22%23fff%22/%3E%3Crect x=%22135%22 y=%22140%22 width=%22180%22 height=%2218%22 rx=%229%22 fill=%22%232563eb%22/%3E%3Crect x=%22135%22 y=%22178%22 width=%22370%22 height=%2210%22 rx=%225%22 fill=%22%2394a3b8%22/%3E%3Crect x=%22135%22 y=%22204%22 width=%22300%22 height=%2210%22 rx=%225%22 fill=%22%23cbd5e1%22/%3E%3Ccircle cx=%22155%22 cy=%22260%22 r=%2220%22 fill=%22%2322c55e%22/%3E%3Cpath d=%22m146 260 7 7 13-15%22 fill=%22none%22 stroke=%22white%22 stroke-width=%224%22/%3E%3C/svg%3E',
        alt: 'Illustration of an accessible content card with a completed status',
      }}
    />
  ),
};

export const OrderedAndUnorderedLists: Story = {
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h2 className="mb-3 font-semibold">Related principles</h2>
        <ContentList items={[
          { id: 'semantic', content: 'Use semantic HTML' },
          { id: 'keyboard', content: 'Support keyboard interaction' },
          { id: 'feedback', content: 'Provide clear feedback' },
        ]} />
      </div>
      <div>
        <h2 className="mb-3 font-semibold">Getting started</h2>
        <ContentList ordered items={[
          { id: 'install', content: 'Install the package' },
          { id: 'import', content: 'Import a component' },
          { id: 'test', content: 'Test it with a keyboard' },
        ]} />
      </div>
    </div>
  ),
};

export const ArticleCard: Story = {
  render: () => (
    <Article
      eyebrow="Accessibility"
      title="Designing useful status messages"
      author="Martina"
      published={{ dateTime: '2026-10-09', label: 'October 9, 2026' }}
      image={{
        src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23dbeafe%22/%3E%3Crect x=%2270%22 y=%2255%22 width=%22500%22 height=%22250%22 rx=%2218%22 fill=%22white%22/%3E%3Crect x=%22105%22 y=%2290%22 width=%22220%22 height=%2222%22 rx=%2211%22 fill=%22%231e3a8a%22/%3E%3Crect x=%22105%22 y=%22135%22 width=%22425%22 height=%2212%22 rx=%226%22 fill=%22%2394a3b8%22/%3E%3C/svg%3E',
        alt: 'Illustration of a status message in a user interface',
        caption: 'Status messages should be clear without relying on color.',
      }}
    >
      <p>Explain what happened and what the user can do next. Use text in addition to color.</p>
      <p>Choose announcement urgency based on how important the update is to the current task.</p>
    </Article>
  ),
};

export const ResourceLinkList: Story = {
  render: () => (
    <LinkList
      label="Accessibility resources"
      links={[
        { href: '#keyboard', label: 'Keyboard testing guide', description: 'Review focus order and interaction without a pointer.' },
        { href: '#screen-reader', label: 'Screen reader testing', description: 'Check names, roles, states, and announcements.' },
        { href: '#contrast', label: 'Color contrast guidance', description: 'Make text and controls perceivable.' },
      ]}
    />
  ),
};

export const FeatureIconList: Story = {
  render: () => (
    <IconList items={[
      { id: 'keyboard', icon: '⌨', title: 'Keyboard ready', description: 'Reach interactive controls without a mouse.' },
      { id: 'contrast', icon: '◐', title: 'Clear contrast', description: 'Read labels and status in varied lighting.' },
      { id: 'feedback', icon: '✓', title: 'Helpful feedback', description: 'Understand errors and how to resolve them.' },
      { id: 'responsive', icon: '↔', title: 'Responsive layouts', description: 'Use the interface at different screen sizes.' },
    ]} />
  ),
};

export const CallToActionBanner: Story = {
  render: () => (
    <CTABanner
      title="Ready to improve your interface?"
      description="Explore accessible patterns and use them in your next project."
      action={{ label: 'Browse components', href: '#components' }}
      secondaryAction={{ label: 'Read the guide', href: '#guide' }}
    />
  ),
};
