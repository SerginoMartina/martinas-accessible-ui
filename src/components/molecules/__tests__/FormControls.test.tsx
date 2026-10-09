import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormErrorSummary } from '../FormErrorSummary';
import { FormField } from '../FormField';
import { AccessibleFormExample } from '../../organisms/AccessibleFormExample';

describe('FormField', () => {
  it('associates a required control with its label, hint, and error', () => {
    render(
      <FormField id="email" label="Email address" hint="Use your work address." error="Enter a valid email." required>
        <input type="email" aria-describedby="existing-help" />
      </FormField>,
    );

    const input = screen.getByRole('textbox', { name: /Email address/ });
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'existing-help email-hint email-error');
    expect(screen.getByText('Use your work address.')).toHaveAttribute('id', 'email-hint');
    expect(screen.getByText('Enter a valid email.')).toHaveAttribute('id', 'email-error');
  });

  it('does not mark a valid field invalid when no error is supplied', () => {
    render(
      <FormField label="Name" hint="Your preferred name">
        <input />
      </FormField>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).not.toHaveAttribute('aria-invalid');
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-describedby');
  });
});

describe('FormErrorSummary', () => {
  it('links each error to its field and is omitted when there are no errors', () => {
    const { rerender } = render(
      <FormErrorSummary errors={[{ id: 'email', label: 'Email', message: 'Enter a valid email.' }]} />,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Email: Enter a valid email.' })).toHaveAttribute('href', '#email');

    rerender(<FormErrorSummary errors={[]} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('AccessibleFormExample', () => {
  it('focuses a linked error summary after invalid submission and reports success when corrected', () => {
    render(<AccessibleFormExample />);
    const form = screen.getByRole('button', { name: 'Send request' }).closest('form');
    if (!form) throw new Error('Accessible form was not rendered');

    fireEvent.submit(form);

    const summary = screen.getByRole('alert');
    expect(summary).toHaveFocus();
    expect(screen.getByRole('link', { name: /Full name: Enter your name/ })).toHaveAttribute('href', '#contact-name');
    expect(screen.getByRole('link', { name: /Email address: Enter your email address/ })).toHaveAttribute('href', '#contact-email');
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute('aria-invalid', 'true');

    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: 'Sam Example' } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: 'sam@example.com' } });
    fireEvent.submit(form);

    expect(screen.getByRole('status')).toHaveTextContent('Your request has been submitted.');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
