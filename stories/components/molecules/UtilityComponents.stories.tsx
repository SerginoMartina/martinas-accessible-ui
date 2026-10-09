import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../../../src/components/atoms/Skeleton';
import { FileUploader } from '../../../src/components/molecules/FileUploader';
import { Tooltip } from '../../../src/components/molecules/Tooltip';

const meta: Meta = { title: 'Molecules/Loading and utility', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const SkeletonStates: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-6 md:grid-cols-2">
      <Skeleton variant="button" />
      <Skeleton variant="input" />
      <Skeleton variant="card" />
      <Skeleton lines={3} />
    </div>
  ),
};

export const FocusableTooltip: Story = {
  render: () => <Tooltip content="Additional help for this control."><span>Focus or hover here</span></Tooltip>,
};

export const UploadFiles: Story = {
  render: () => (
    <FileUploader
      label="Select documents"
      accept=".pdf,image/*"
      maxFileSize={5 * 1024 * 1024}
      onUpload={async (_file, reportProgress) => {
        reportProgress(50);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }}
    />
  ),
};
