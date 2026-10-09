import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../src/components/molecules/Accordion';
import { Pagination } from '../../../src/components/molecules/Pagination';
import { Select } from '../../../src/components/molecules/Select';
import { Tabs } from '../../../src/components/molecules/Tabs';

const meta: Meta = { title: 'Molecules/Architecture controls', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const TabList: Story = {
  render: () => (
    <Tabs
      ariaLabel="Settings"
      tabs={[
        { id: 'general', label: 'General', content: <p>General settings.</p> },
        { id: 'privacy', label: 'Privacy', content: <p>Privacy settings.</p> },
        { id: 'billing', label: 'Billing', content: <p>Billing settings.</p> },
      ]}
    />
  ),
};

export const AccordionSections: Story = {
  render: () => (
    <Accordion
      multiple
      items={[
        { id: 'one', title: 'First section', content: 'First section content.' },
        { id: 'two', title: 'Second section', content: 'Second section content.' },
      ]}
    />
  ),
};

export const SearchableSelect: Story = {
  render: () => (
    <Select
      label="Choose a workspace"
      options={[
        { value: 'design', label: 'Design', description: 'Design and research' },
        { value: 'engineering', label: 'Engineering', description: 'Product development' },
      ]}
    />
  ),
};

export const EllipsisPagination: Story = {
  render: () => <Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />,
};
