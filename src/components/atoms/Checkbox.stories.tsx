import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    label: 'Accept terms',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to updates',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable option',
    checked: false,
    disabled: true,
  },
};
