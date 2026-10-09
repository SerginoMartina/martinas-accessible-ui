import { useId, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

export interface CaptchaFieldProps {
  label?: string;
  challenge: ReactNode;
  verified: boolean;
  hint?: string;
  error?: string;
  className?: string;
}

export function CaptchaField({
  label = 'Human verification',
  challenge,
  verified,
  hint = 'Complete the verification challenge provided by the configured CAPTCHA service.',
  error,
  className = '',
}: CaptchaFieldProps) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset aria-describedby={describedBy} className={`min-w-0 rounded-lg border border-slate-300 p-4 ${className}`}>
      <legend className="px-1 font-medium text-slate-900">{label}</legend>
      {hint && <p id={`${id}-hint`} className="mb-3 text-sm leading-6 text-slate-700">{hint}</p>}
      <div>{challenge}</div>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-700">
        {verified ? 'Verification complete.' : 'Verification required.'}
      </p>
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-red-800">{error}</p>}
    </fieldset>
  );
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void | Promise<void>;
  onError?: (error: unknown) => void;
  title?: string;
  submitLabel?: string;
  error?: string;
  className?: string;
}

export function LoginForm({
  onSubmit,
  onError,
  title = 'Sign in',
  submitLabel = 'Sign in',
  error,
  className = '',
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const id = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setFeedback('');
    setSubmissionError('');

    try {
      await onSubmit({ email, password });
      setPassword('');
      setFeedback('Sign-in request completed.');
    } catch (cause) {
      onError?.(cause);
      setSubmissionError('Sign-in could not be completed. Check your details or try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={pending}
      className={`w-full max-w-md space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <div>
        <label htmlFor={`${id}-email`} className="mb-1 block text-sm font-medium text-slate-800">Email address</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-700"
        />
      </div>
      <div>
        <label htmlFor={`${id}-password`} className="mb-1 block text-sm font-medium text-slate-800">Password</label>
        <input
          id={`${id}-password`}
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 focus-visible:outline-2 focus-visible:outline-blue-700"
        />
        <button
          type="button"
          aria-pressed={showPassword}
          onClick={() => setShowPassword((visible) => !visible)}
          className="mt-2 rounded text-sm font-medium text-blue-800 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          {showPassword ? 'Hide password' : 'Show password'}
        </button>
      </div>
      {(error || submissionError) && (
        <p role="alert" className="text-sm font-medium text-red-800">{error || submissionError}</p>
      )}
      {feedback && <p role="status" className="text-sm text-slate-700">{feedback}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Signing in…' : submitLabel}
      </button>
    </form>
  );
}
