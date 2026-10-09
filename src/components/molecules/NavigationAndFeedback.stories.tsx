import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LiveRegion } from '../atoms/LiveRegion';
import { SkipLink } from '../atoms/SkipLink';
import { Button } from '../atoms/Button';
import { Combobox } from './Combobox';
import { InlineAlert } from './InlineAlert';
import { MenuButton } from './MenuButton';
import { RadioGroup } from './RadioGroup';

const meta: Meta = { title: 'Accessibility patterns/Navigation and feedback', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const RadioGroupChoices: Story = {
  render: () => (
    <RadioGroup
      name="delivery-method"
      legend="Delivery method"
      hint="Choose one delivery option."
      required
      options={[
        { value: 'standard', label: 'Standard', description: 'Arrives in 3–5 business days.' },
        { value: 'express', label: 'Express', description: 'Arrives in 1–2 business days.' },
        { value: 'pickup', label: 'Pickup', disabled: true },
      ]}
    />
  ),
};

export const SearchableCombobox: Story = {
  render: () => (
    <Combobox
      label="Search a city"
      hint="Choose a suggestion or enter another city."
      allowCustomValue
      options={[
        { value: 'new-york', label: 'New York', description: 'United States' },
        { value: 'london', label: 'London', description: 'United Kingdom' },
        { value: 'tokyo', label: 'Tokyo', description: 'Japan' },
      ]}
    />
  ),
};

export const SkipToContent: Story = {
  render: () => (
    <div className="relative min-h-32 rounded border border-dashed border-slate-300 p-5">
      <SkipLink href="#story-main">Skip to example content</SkipLink>
      <p>Tab to reveal the link, then activate it.</p>
      <main id="story-main" tabIndex={-1} className="mt-4 rounded bg-slate-100 p-3 focus:outline focus:outline-2 focus:outline-blue-700">
        Example main content
      </main>
    </div>
  ),
};

export const ActionMenu: Story = {
  render: () => (
    <MenuButton
      label="Account actions"
      items={[
        { id: 'profile', label: 'View profile', onSelect: () => {} },
        { id: 'settings', label: 'Settings', onSelect: () => {} },
        { id: 'sign-out', label: 'Sign out', onSelect: () => {} },
      ]}
    />
  ),
};

export const InlineFeedback: Story = {
  render: () => (
    <div className="max-w-xl space-y-3">
      <InlineAlert variant="info" title="Information">Your changes are saved automatically.</InlineAlert>
      <InlineAlert variant="success" title="Success">The invitation was sent.</InlineAlert>
      <InlineAlert variant="warning" title="Attention">Your session expires soon.</InlineAlert>
      <InlineAlert variant="error" title="Error">The request could not be completed.</InlineAlert>
    </div>
  ),
};

function LiveRegionExample() {
  const [message, setMessage] = useState('');
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Button onClick={() => setMessage('Changes saved successfully.')}>Save changes</Button>
        <Button variant="outline" onClick={() => setMessage('')}>Clear announcement</Button>
      </div>
      <p>Current update: {message || 'No update'}</p>
      <LiveRegion>{message}</LiveRegion>
    </div>
  );
}

export const PoliteLiveUpdate: Story = {
  render: () => <LiveRegionExample />,
};
