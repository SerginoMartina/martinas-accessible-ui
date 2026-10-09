import type { Meta, StoryObj } from '@storybook/react';
import { FormErrorSummary } from '../../../src/components/molecules/FormErrorSummary';
import { FormField } from '../../../src/components/molecules/FormField';
import { AccessibleFormExample } from '../../../src/components/organisms/AccessibleFormExample';

const meta: Meta = { title: 'Forms/Accessible form patterns', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const FieldWithHintAndError: Story = {
  render: () => (
    <div className="max-w-md space-y-5">
      <FormField
        id="story-email"
        label="Email address"
        hint="Use your work email."
        error="Enter a valid email address."
        required
      >
        <input
          type="email"
          className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </FormField>
      <FormErrorSummary
        heading="There are 2 problems"
        errors={[
          { id: 'story-email', label: 'Email address', message: 'Enter a valid email address.' },
          { id: 'story-name', label: 'Full name', message: 'Enter your name.' },
        ]}
      />
    </div>
  ),
};

export const CompleteAccessibleForm: Story = {
  render: () => <AccessibleFormExample />,
};
