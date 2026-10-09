import { render, screen } from '@testing-library/react';
import { Button } from '../Button';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('renders correctly with primary variant', () => {
    render(<Button variant="primary">Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass(/bg-primary/);
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass(/bg-secondary/);
  });

  it('disables the button correctly', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
