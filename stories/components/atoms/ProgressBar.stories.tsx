import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../../../src/components/atoms/ProgressBar';
import { Button } from '../../../src/components/atoms/Button';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    progress: 65,
    label: 'Loading Progress',
  },
};

export const Success: Story = {
  args: {
    progress: 100,
    color: 'success',
    label: 'Complete',
  },
};

function InteractiveProgress() {
  const [progress, setProgress] = useState(15);
  return (
    <div className="w-96 space-y-4">
      <ProgressBar progress={progress} label="Upload progress" valueText={`${progress}% complete`} />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setProgress((value) => Math.max(0, value - 10))}>Decrease progress</Button>
        <Button onClick={() => setProgress((value) => Math.min(100, value + 10))}>Advance progress</Button>
      </div>
      <p role="status" aria-live="polite">{progress === 100 ? 'Upload complete.' : `Upload ${progress}% complete.`}</p>
    </div>
  );
}

export const Interactive: Story = { render: () => <InteractiveProgress /> };

export const Indeterminate: Story = {
  args: { label: 'Preparing upload' },
};
