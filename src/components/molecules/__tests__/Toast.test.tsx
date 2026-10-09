import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toast } from '../Toast';

describe('Toast', () => {
  it('exposes the message as an alert and calls onClose when dismissed', () => {
    const onClose = vi.fn();
    render(<Toast message="Saved" duration={0} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close toast' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Saved');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not render a non-functional dismiss button without an onClose handler', () => {
    render(<Toast message="Information" duration={0} />);

    expect(screen.queryByRole('button', { name: 'Close toast' })).not.toBeInTheDocument();
  });
});
