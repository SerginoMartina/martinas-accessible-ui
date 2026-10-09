import React from 'react';

export interface Option {
  label: string;
  value: string;
  multiple?: boolean;
}

export interface MultiSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
  className?: string;
}
