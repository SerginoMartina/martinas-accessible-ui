import { render, screen } from '@testing-library/react';
import { Input } from '../Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders error message correctly', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  });
});
