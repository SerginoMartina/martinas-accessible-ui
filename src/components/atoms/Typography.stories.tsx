import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Headline One',
  },
};

export const P: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph of text. It should be legible and have proper spacing.',
  },
};
