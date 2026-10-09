import React from 'react';

export interface ProgressBarProps {
  progress?: number; // 0-100; omit for indeterminate progress
  color?: 'primary' | 'success' | 'warning' | 'danger';
  label?: string;
  valueText?: string;
}
