import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    message: 'Action completed successfully',
    type: 'success',
    duration: 3000,
  },
};

export const Danger: Story = {
  args: {
    message: 'Something went wrong',
    type: 'danger',
    duration: 3000,
  },
};
