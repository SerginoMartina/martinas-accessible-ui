import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Skeleton } from '../../atoms/Skeleton';
import { FileUploader } from '../FileUploader';
import { Tooltip } from '../Tooltip';

describe('Tooltip', () => {
  it('shows its described tooltip when the trigger receives keyboard focus', () => {
    render(
      <Tooltip content="More information">
        <span>Help details</span>
      </Tooltip>,
    );
    const trigger = screen.getByText('Help details');
    fireEvent.focus(trigger);

    expect(screen.getByRole('tooltip')).toHaveTextContent('More information');
    expect(trigger).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);
  });
});

describe('Skeleton', () => {
  it('renders button, input, and card loading placeholders as decorative content', () => {
    const { container } = render(
      <>
        <Skeleton variant="button" />
        <Skeleton variant="input" />
        <Skeleton variant="card" />
      </>,
    );

    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });
});

describe('FileUploader', () => {
  it('validates file types and exposes per-file upload progress', async () => {
    const onUpload = vi.fn(async (_file: File, reportProgress: (progress: number) => void) => {
      reportProgress(48);
    });
    const { container } = render(
      <FileUploader label="Upload PDF" accept=".pdf" onUpload={onUpload} />,
    );
    const input = container.querySelector('input[type="file"]');
    if (!(input instanceof HTMLInputElement)) throw new Error('File input was not rendered');

    fireEvent.change(input, {
      target: {
        files: [
          new File(['document'], 'report.pdf', { type: 'application/pdf' }),
          new File(['appendix'], 'appendix.pdf', { type: 'application/pdf' }),
        ],
      },
    });

    await waitFor(() => expect(screen.getByRole('progressbar', { name: 'report.pdf upload progress' })).toHaveAttribute('aria-valuenow', '100'));
    await waitFor(() => expect(screen.getByRole('progressbar', { name: 'appendix.pdf upload progress' })).toHaveAttribute('aria-valuenow', '100'));
    expect(onUpload).toHaveBeenCalledTimes(2);
    expect(screen.getAllByText('Complete')).toHaveLength(2);
  });

  it('rejects disallowed file types before uploading', () => {
    const onUpload = vi.fn(async () => {});
    const { container } = render(<FileUploader accept=".pdf" onUpload={onUpload} />);
    const input = container.querySelector('input[type="file"]');
    if (!(input instanceof HTMLInputElement)) throw new Error('File input was not rendered');

    fireEvent.change(input, {
      target: { files: [new File(['image'], 'photo.png', { type: 'image/png' })] },
    });

    expect(screen.getByRole('alert')).toHaveTextContent('file type is not allowed');
    expect(onUpload).not.toHaveBeenCalled();
  });
});
