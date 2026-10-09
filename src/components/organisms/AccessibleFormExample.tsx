import { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms/Button';
import { FormErrorSummary } from '../molecules/FormErrorSummary';
import type { FormError } from '../molecules/FormErrorSummary';
import { FormField } from '../molecules/FormField';

const fieldIds = {
  name: 'contact-name',
  email: 'contact-email',
};

export function AccessibleFormExample() {
  const summaryRef = useRef<HTMLElement>(null);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const hasErrors = errors.length > 0;

  useEffect(() => {
    if (submitted && hasErrors) summaryRef.current?.focus();
  }, [hasErrors, submitted]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const nextErrors: FormError[] = [];

    if (!name) {
      nextErrors.push({
        id: fieldIds.name,
        label: 'Full name',
        message: 'Enter your name.',
      });
    }
    if (!email) {
      nextErrors.push({
        id: fieldIds.email,
        label: 'Email address',
        message: 'Enter your email address.',
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.push({
        id: fieldIds.email,
        label: 'Email address',
        message: 'Enter an email address in the format name@example.com.',
      });
    }

    setErrors(nextErrors);
    setSubmitted(true);
    setSuccess(nextErrors.length === 0);
  };

  const clearResult = () => {
    setSubmitted(false);
    setSuccess(false);
  };

  const clearFieldError = (id: string) => {
    clearResult();
    setErrors((current) => current.filter((error) => error.id !== id));
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <p className="text-sm text-slate-600">
        Fields marked required must be completed. Submitting an empty form shows how errors are
        summarized and linked to the relevant fields.
      </p>
      {success && (
        <p role="status" className="rounded-md border border-green-700 bg-green-50 p-3 text-sm font-medium text-green-900">
          Your request has been submitted.
        </p>
      )}
      <FormErrorSummary ref={summaryRef} errors={errors} heading="Review the following fields" />
      <FormField
        id={fieldIds.name}
        label="Full name"
        hint="Enter the name you want us to use."
        error={errors.find((error) => error.id === fieldIds.name)?.message}
        required
      >
        <input
          name="name"
          autoComplete="name"
          className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
          onChange={() => clearFieldError(fieldIds.name)}
        />
      </FormField>
      <FormField
        id={fieldIds.email}
        label="Email address"
        hint="We will only use this to reply to your request."
        error={errors.find((error) => error.id === fieldIds.email)?.message}
        required
      >
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
          onChange={() => clearFieldError(fieldIds.email)}
        />
      </FormField>
      <FormField label="How can we help?" hint="Do not include sensitive personal information.">
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
        />
      </FormField>
      <Button type="submit">Send request</Button>
    </form>
  );
}
