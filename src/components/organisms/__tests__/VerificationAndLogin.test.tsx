import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CaptchaField, LoginForm } from '../VerificationAndLogin';

describe('CaptchaField', () => {
  it('names the provider challenge group and announces completion state', () => {
    const { rerender } = render(
      <CaptchaField
        verified={false}
        hint="Complete the service challenge."
        challenge={<div>Provider challenge content</div>}
      />,
    );

    expect(screen.getByRole('group', { name: 'Human verification' })).toHaveAccessibleDescription('Complete the service challenge.');
    expect(screen.getByRole('status')).toHaveTextContent('Verification required.');

    rerender(<CaptchaField verified challenge={<div>Provider challenge content</div>} />);
    expect(screen.getByRole('status')).toHaveTextContent('Verification complete.');
  });

  it('announces and associates a provider or application error', () => {
    render(<CaptchaField verified={false} error="Complete the challenge before continuing." challenge={<div>Provider widget</div>} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Complete the challenge before continuing.');
    expect(screen.getByRole('group', { name: 'Human verification' })).toHaveAccessibleDescription(/Complete the challenge/);
  });
});

describe('LoginForm', () => {
  it('submits credentials to its callback and clears the password after success', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), { target: { value: 'person@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'safe-example-password' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign in$/ }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ email: 'person@example.com', password: 'safe-example-password' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Sign-in request completed.');
    expect(screen.getByLabelText('Password')).toHaveValue('');
  });

  it('toggles password visibility accessibly and reports rejected submission', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('internal auth detail'));
    render(<LoginForm onSubmit={onSubmit} />);

    const password = screen.getByLabelText('Password');
    const toggle = screen.getByRole('button', { name: 'Show password' });
    expect(password).toHaveAttribute('type', 'password');
    fireEvent.click(toggle);
    expect(password).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute('aria-pressed', 'true');

    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), { target: { value: 'person@example.com' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /^Sign in$/ }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Sign-in could not be completed. Check your details or try again.');
    expect(screen.queryByText('internal auth detail')).not.toBeInTheDocument();
  });

  it('uses native required fields with password-manager autocomplete', () => {
    render(<LoginForm onSubmit={() => {}} />);

    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveAttribute('autocomplete', 'username');
    expect(screen.getByLabelText('Password')).toHaveAttribute('autocomplete', 'current-password');
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });
});
