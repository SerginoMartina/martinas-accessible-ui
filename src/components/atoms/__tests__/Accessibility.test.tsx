import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../Checkbox';
import { ProgressBar } from '../ProgressBar';
import { Typography } from '../Typography';

describe('Accessible atoms', () => {
  it('associates a checkbox label with its input when no id is provided', () => {
    render(<Checkbox label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('renders progress as an accessible, bounded progressbar', () => {
    render(<ProgressBar progress={120} label="Upload" />);

    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
  });

  it('updates the visual and accessible progress value and supports indeterminate work', () => {
    const { rerender } = render(<ProgressBar progress={0} label="Download" />);
    expect(screen.getByRole('progressbar', { name: 'Download' })).toHaveAttribute('aria-valuenow', '0');

    rerender(<ProgressBar progress={45} label="Download" valueText="Nearly halfway" />);
    expect(screen.getByRole('progressbar', { name: 'Download' })).toHaveAttribute('aria-valuenow', '45');
    expect(screen.getByRole('progressbar', { name: 'Download' })).toHaveAttribute('aria-valuetext', 'Nearly halfway');

    rerender(<ProgressBar label="Preparing download" />);
    expect(screen.getByRole('progressbar', { name: 'Preparing download' })).not.toHaveAttribute('aria-valuenow');
  });

  it('renders typography variants with their corresponding semantic elements', () => {
    render(<Typography variant="h2">Section title</Typography>);

    expect(screen.getByRole('heading', { level: 2, name: 'Section title' })).toBeInTheDocument();
  });
});
