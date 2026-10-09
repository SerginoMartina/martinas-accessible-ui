export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  label?: string;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  label = 'Progress',
  className = '',
}: StepperProps) {
  const activeStep = Math.min(Math.max(currentStep, 0), Math.max(steps.length - 1, 0));

  return (
    <nav aria-label={label} className={className}>
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {steps.map((step, index) => {
          const completed = index < activeStep;
          const current = index === activeStep;
          const status = current ? 'Current step' : completed ? 'Completed' : 'Upcoming';
          const contents = (
            <>
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                  current ? 'border-blue-700 bg-blue-700 text-white' :
                  completed ? 'border-green-700 bg-green-700 text-white' :
                  'border-slate-400 bg-white text-slate-700'
                }`}
              >
                {completed ? '✓' : index + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-slate-900">{step.label}</span>
                <span className={`block text-xs ${current ? 'font-medium text-blue-800' : 'text-slate-600'}`}>
                  {status}
                </span>
                {step.description && <span className="mt-1 block text-xs text-slate-600">{step.description}</span>}
              </span>
            </>
          );

          return (
            <li key={step.id} className="flex min-w-0 flex-1 items-start gap-3">
              {onStepChange && completed ? (
                <button
                  type="button"
                  onClick={() => onStepChange(index)}
                  aria-label={`Go to completed step ${index + 1}: ${step.label}`}
                  className="flex items-start gap-3 rounded text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  {contents}
                </button>
              ) : (
                <div aria-current={current ? 'step' : undefined} className="flex items-start gap-3">
                  {contents}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
