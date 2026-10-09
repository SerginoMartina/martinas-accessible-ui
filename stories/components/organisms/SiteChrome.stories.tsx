import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../src/components/atoms/Button';
import { ContentBlock, PopupSidebar, SiteFooter, SiteHeader, SiteSidebar } from '../../../src/components/organisms/SiteChrome';

const meta: Meta = { title: 'Page layout/Site chrome', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

const navigation = [
  { label: 'Components', href: '#components' },
  { label: 'Guides', href: '#guides' },
  { label: 'About', href: '#about' },
];

export const InFlowHeader: Story = {
  render: () => <SiteHeader brand="Inclusive Studio" links={navigation} actions={<Button size="sm">Get started</Button>} />,
};

export const FixedHeader: Story = {
  render: () => (
    <div className="min-h-72">
      <SiteHeader brand="Inclusive Studio" position="fixed" links={navigation} />
      <main className="p-6"><h1 className="text-xl font-semibold">Page content</h1><p className="mt-2">The fixed header reserves space so the page starts below it.</p></main>
    </div>
  ),
};

export const SectionSidebar: Story = {
  render: () => <SiteSidebar label="Documentation sections" title="On this page" items={[
    { label: 'Getting started', href: '#getting-started' },
    { label: 'Components', href: '#components', current: true },
    { label: 'Accessibility', href: '#accessibility' },
  ]} className="max-w-xs" />,
};

export const PopupNavigation: Story = {
  render: () => <PopupSidebar label="Site navigation" title="Explore" triggerLabel="Open site navigation" items={[
    { label: 'Home', href: '#home' },
    { label: 'Components', href: '#components', current: true },
    { label: 'Guides', href: '#guides' },
    { label: 'Contact', href: '#contact' },
  ]} />,
};

export const FooterVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <SiteFooter brand="Inclusive Studio" description="Building clear, accessible digital experiences." copyright="© 2026 Inclusive Studio" links={navigation} />
      <SiteFooter variant="columns" brand="Inclusive Studio" description="Building clear, accessible digital experiences." copyright="© 2026 Inclusive Studio" columns={[
        { heading: 'Explore', links: [{ label: 'Components', href: '#components' }, { label: 'Patterns', href: '#patterns' }] },
        { heading: 'Support', links: [{ label: 'Accessibility', href: '#accessibility' }, { label: 'Contact', href: '#contact' }] },
      ]} />
      <SiteFooter variant="minimal" brand="Inclusive Studio" copyright="© 2026 Inclusive Studio" links={[
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ]} />
    </div>
  ),
};

function ContentBlockVariants() {
  const [variant, setVariant] = useState<'default' | 'muted' | 'accent' | 'bordered'>('bordered');
  return (
    <div className="max-w-3xl space-y-4">
      <label className="flex items-center gap-3 text-sm font-medium">
        Content treatment
        <select value={variant} onChange={(event) => setVariant(event.target.value as typeof variant)} className="min-h-11 rounded-md border border-slate-400 bg-white px-3 focus-visible:outline-2 focus-visible:outline-blue-700">
          <option value="default">Default</option>
          <option value="muted">Muted</option>
          <option value="accent">Accent</option>
          <option value="bordered">Bordered</option>
        </select>
      </label>
      <ContentBlock title="Accessible by default" description="Group related information into a clearly named section." variant={variant}>
        <p>Content blocks create consistent hierarchy without changing the semantics of the content inside.</p>
      </ContentBlock>
    </div>
  );
}

export const ContentBlockTreatments: Story = { render: () => <ContentBlockVariants /> };
