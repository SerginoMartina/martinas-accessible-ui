import { forwardRef, useId } from 'react';

export interface FormError {
  id: string;
  label: string;
  message: string;
}

export interface FormErrorSummaryProps {
  errors: FormError[];
  heading?: string;
  className?: string;
}

export const FormErrorSummary = forwardRef<HTMLElement, FormErrorSummaryProps>(function FormErrorSummary({
  errors,
  heading = 'There is a problem',
  className = '',
}, ref) {
  const headingId = useId();
  if (errors.length === 0) return null;

  return (
    <section
      ref={ref}
      aria-labelledby={headingId}
      role="alert"
      tabIndex={-1}
      className={`rounded-md border-2 border-red-700 bg-red-50 p-4 text-red-950 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-red-800 ${className}`}
    >
      <h2 id={headingId} className="font-semibold">{heading}</h2>
      <ul className="mt-2 list-inside list-disc space-y-1">
        {errors.map((error) => (
          <li key={error.id}>
            <a className="font-medium underline underline-offset-2" href={`#${error.id}`}>
              {error.label}: {error.message}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});
