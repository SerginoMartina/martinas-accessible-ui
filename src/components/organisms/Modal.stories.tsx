import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../atoms/Button';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Closed'),
    title: 'Welcome Modal',
    children: (
      <div className="py-4">
        <p className="mb-4">This is a sample modal component. It is fully accessible and responsive.</p>
        <Button onClick={() => console.log('Action clicked')}>Confirm Action</Button>
      </div>
    ),
  },
};
