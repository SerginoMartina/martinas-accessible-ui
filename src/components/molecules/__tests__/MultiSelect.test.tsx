import { fireEvent, render, screen } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';
import '@testing-library/jest-dom';

const mockOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
];

describe('MultiSelect Component', () => {
  it('renders placeholder when no options selected', () => {
    render(<MultiSelect options={mockOptions} />);
    expect(screen.getByText('Select options...')).toBeInTheDocument();
  });

  it('adds an option to selected list', () => {
    render(<MultiSelect options={mockOptions} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'React' }));
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('opens and selects options with the keyboard and reports the updated value', () => {
    const onChange = vi.fn();
    render(<MultiSelect options={mockOptions} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('option', { name: 'React' }), { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(['react']);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
