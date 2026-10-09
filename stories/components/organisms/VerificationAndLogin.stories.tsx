import type { Meta, StoryObj } from '@storybook/react';
import { CaptchaField, LoginForm } from '../../../src/components/organisms/VerificationAndLogin';

const meta: Meta = { title: 'Authentication patterns', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const CaptchaProviderSlot: Story = {
  render: () => (
    <CaptchaField
      verified={false}
      challenge={
        <div className="rounded-md border border-dashed border-slate-400 bg-slate-50 p-4 text-sm text-slate-700">
          Mount an accessible CAPTCHA provider challenge here. This example does not verify users.
        </div>
      }
    />
  ),
};

export const SignInForm: Story = {
  render: () => (
    <div className="space-y-3">
      <LoginForm
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }}
      />
      <p role="note" className="text-sm text-slate-600">Example callback only; no credentials are sent to a server.</p>
    </div>
  ),
};
