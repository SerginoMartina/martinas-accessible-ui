import React from 'react';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({ 
  progress, 
  color = 'primary',
  label,
  valueText,
  ...props 
}: ProgressBarProps) => {
  const labelId = React.useId();
  const value = progress === undefined || !Number.isFinite(progress) ? undefined : Math.min(100, Math.max(0, progress));
  const colorStyles = {
    primary: "bg-primary",
    success: "bg-green-700",
    warning: "bg-amber-700",
    danger: "bg-red-700",
  };

  return (
    <div className="w-full">
      {label && (
        <div id={labelId} className="mb-2 text-sm">
          {label}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label ? undefined : 'Progress'}
        aria-labelledby={label ? labelId : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={valueText}
        className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
        {...props}
      >
        <div
          aria-hidden="true"
          className={`h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none ${value === undefined ? `${colorStyles[color]} w-2/5 animate-pulse motion-reduce:animate-none` : `${colorStyles[color]}`}`}
          style={value === undefined ? undefined : { width: `${value}%` }}
        />
      </div>
    </div>
  );
};
