import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DateRangePicker } from '../DateRangePicker';

describe('DateRangePicker', () => {
  it('supports month/year selection and selecting a leap-day range endpoint', () => {
    render(
      <DateRangePicker
        label="Travel dates"
        defaultValue={{ startDate: new Date(2024, 1, 28), endDate: null }}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Feb 28, 2024/ }));
    expect(screen.getByRole('dialog', { name: 'Travel dates' })).toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toHaveValue('1');
    expect(screen.getByLabelText('Year')).toHaveValue('2024');

    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2023' } });
    expect(screen.getByRole('grid', { name: 'February 2023' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2024' } });
    fireEvent.click(screen.getByRole('button', { name: 'Feb 29, 2024' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Feb 28, 2024 – Feb 29, 2024/ })).toBeInTheDocument();
  });

  it('restarts a partial range if the chosen end precedes its start', () => {
    render(<DateRangePicker label="Dates" defaultValue={{ startDate: new Date(2024, 2, 10), endDate: null }} />);

    fireEvent.click(screen.getByRole('button', { name: /Mar 10, 2024/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Mar 8, 2024' }));

    expect(screen.getByRole('button', { name: /Mar 8, 2024 – Choose end date/ })).toBeInTheDocument();
  });
});
