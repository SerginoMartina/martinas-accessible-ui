import { useRef, useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { InlineAlert } from '../molecules/InlineAlert';
import { RadioGroup } from '../molecules/RadioGroup';
import { Stepper } from '../molecules/Stepper';

const steps = [
  { id: 'contact', label: 'Contact details', description: 'How we can reach you' },
  { id: 'preferences', label: 'Preferences', description: 'Tell us what you need' },
  { id: 'review', label: 'Review', description: 'Check before sending' },
];

export function AccessibleMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setError('');
    setSubmitted(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const continueStep = () => {
    if (currentStep === 0) {
      if (!name.trim()) {
        setError('Enter your full name before continuing.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setError('Enter a valid email address before continuing.');
        return;
      }
    }
    if (currentStep < steps.length - 1) goToStep(currentStep + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={goToStep}
        label="Request form progress"
      />
      <section aria-labelledby="multi-step-heading" aria-describedby={error ? 'multi-step-error' : undefined}>
        <h2
          id="multi-step-heading"
          ref={headingRef}
          tabIndex={-1}
          className="text-xl font-semibold text-slate-950 focus:outline focus:outline-2 focus:outline-blue-700"
        >
          {steps[currentStep].label}
        </h2>
        {error && <p id="multi-step-error" role="alert" className="mt-3 rounded-md border border-red-700 bg-red-50 p-3 text-sm font-medium text-red-900">{error}</p>}
        {currentStep === 0 && (
          <div className="mt-5 space-y-4">
            <FormField label="Full name" required>
              <input
                autoComplete="name"
                value={name}
                onChange={(event) => { setName(event.target.value); setError(''); }}
                className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              />
            </FormField>
            <FormField label="Email address" hint="Use an address where we can reach you." required>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setError(''); }}
                className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
              />
            </FormField>
          </div>
        )}
        {currentStep === 1 && (
          <div className="mt-5 space-y-4">
            <RadioGroup
              name="multi-step-contact-method"
              legend="Preferred contact method"
              value={contactMethod}
              onChange={setContactMethod}
              options={[
                { value: 'email', label: 'Email' },
                { value: 'phone', label: 'Phone' },
              ]}
            />
            <p className="text-sm text-slate-600">You can review your details before sending.</p>
          </div>
        )}
        {currentStep === 2 && (
          <dl className="mt-5 divide-y divide-slate-200 rounded-md border border-slate-200">
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-medium text-slate-700">Full name</dt>
              <dd className="text-sm text-slate-900">{name}</dd>
            </div>
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-medium text-slate-700">Email address</dt>
              <dd className="text-sm text-slate-900">{email}</dd>
            </div>
            <div className="grid gap-1 p-4 sm:grid-cols-[10rem_1fr]">
              <dt className="text-sm font-medium text-slate-700">Contact method</dt>
              <dd className="text-sm text-slate-900">{contactMethod === 'email' ? 'Email' : 'Phone'}</dd>
            </div>
          </dl>
        )}
      </section>
      {submitted && <InlineAlert variant="success" title="Request received">Your example request is complete. No information was sent to a server.</InlineAlert>}
      <div className="flex flex-wrap gap-3">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={() => goToStep(currentStep - 1)}>
            Back
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={continueStep}>Continue</Button>
        ) : (
          <Button type="submit" disabled={submitted}>{submitted ? 'Submitted' : 'Submit request'}</Button>
        )}
      </div>
    </form>
  );
}
