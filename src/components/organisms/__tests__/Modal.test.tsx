import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from '../Modal';
import '@testing-library/jest-dom';

describe('Modal Component', () => {
  it('renders content when open', () => {
    const onClose = vi.fn();
    render(
      <Modal 
        isOpen={true} 
        onClose={onClose} 
        title="Test Modal"
      >
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Test Modal' })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal 
        isOpen={false} 
        onClose={vi.fn()} 
        title="Test Modal"
      >
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('traps keyboard focus and restores focus to the opener on Escape', () => {
    const Harness = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <button onClick={() => setIsOpen(true)}>Open dialog</button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Test Modal">
            <button>Dialog action</button>
          </Modal>
        </>
      );
    };

    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    trigger.focus();
    fireEvent.click(trigger);

    const closeButton = screen.getByRole('button', { name: 'Close Modal' });
    const actionButton = screen.getByRole('button', { name: 'Dialog action' });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(actionButton);
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });
});
