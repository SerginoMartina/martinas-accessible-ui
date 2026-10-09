import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Molecules/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    label: 'Travel dates',
  },
};

export const WithRange: Story = {
  args: {
    label: 'Report period',
    defaultValue: {
      startDate: new Date(2026, 0, 12),
      endDate: new Date(2026, 0, 20),
    },
  },
};
