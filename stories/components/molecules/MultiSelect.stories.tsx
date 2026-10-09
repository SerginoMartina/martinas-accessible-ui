import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '../../../src/components/molecules/MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Molecules/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const mockOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
];

export const Default: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Choose your frameworks...',
  },
};
