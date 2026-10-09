import { useId, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

export type FileUploadHandler = (
  file: File,
  reportProgress: (progress: number) => void,
) => Promise<void>;

export interface FileUploaderProps {
  onUpload: FileUploadHandler;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  label?: string;
  disabled?: boolean;
  className?: string;
}

function matchesAccept(file: File, accept: string) {
  const rules = accept.split(',').map((rule) => rule.trim().toLocaleLowerCase()).filter(Boolean);
  if (rules.length === 0) return true;
  return rules.some((rule) => {
    if (rule.startsWith('.')) return file.name.toLocaleLowerCase().endsWith(rule);
    if (rule.endsWith('/*')) return file.type.toLocaleLowerCase().startsWith(rule.slice(0, -1));
    return file.type.toLocaleLowerCase() === rule;
  });
}

export function FileUploader({
  onUpload,
  accept = '',
  multiple = true,
  maxFiles = 5,
  maxFileSize,
  label = 'Upload files',
  disabled = false,
  className = '',
}: FileUploaderProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const sequence = useRef(0);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [message, setMessage] = useState('');
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming: File[]) => {
    setMessage('');
    const valid: File[] = [];
    const errors: string[] = [];
    const remainingSlots = Math.max(0, maxFiles - files.length);

    incoming.forEach((file) => {
      if (!matchesAccept(file, accept)) {
        errors.push(`${file.name}: file type is not allowed.`);
      } else if (maxFileSize !== undefined && file.size > maxFileSize) {
        errors.push(`${file.name}: file exceeds the ${Math.ceil(maxFileSize / 1024 / 1024)} MB size limit.`);
      } else if (valid.length >= remainingSlots || (!multiple && (files.length > 0 || valid.length > 0))) {
        errors.push(`${file.name}: file limit reached.`);
      } else {
        valid.push(file);
      }
    });

    if (errors.length > 0) setMessage(errors.join(' '));
    if (valid.length === 0) return;

    const queued = valid.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${sequence.current++}`,
      file,
      progress: 0,
      status: 'uploading' as const,
    }));
    setFiles((previous) => [...previous, ...queued]);

    queued.forEach((entry) => {
      const reportProgress = (progress: number) => {
        const boundedProgress = Math.min(100, Math.max(0, Math.round(progress)));
        setFiles((previous) => previous.map((current) =>
          current.id === entry.id ? { ...current, progress: boundedProgress } : current,
        ));
      };
      void Promise.resolve().then(() => onUpload(entry.file, reportProgress)).then(() => {
        setFiles((previous) => previous.map((current) =>
          current.id === entry.id ? { ...current, progress: 100, status: 'complete' } : current,
        ));
      }).catch((error: unknown) => {
        const errorMessage = error instanceof Error && error.message
          ? error.message
          : 'Upload failed. Please try again.';
        setFiles((previous) => previous.map((current) =>
          current.id === entry.id ? { ...current, status: 'error', error: errorMessage } : current,
        ));
      });
    });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) addFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <section className={`space-y-3 ${className}`}>
      <div
        onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors focus-within:ring-2 focus-within:ring-blue-700 focus-within:ring-offset-2 ${
          dragging ? 'border-blue-700 bg-blue-50' : 'border-slate-300 bg-white'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        <label htmlFor={`${id}-input`} className="cursor-pointer font-medium text-blue-800 underline underline-offset-2">
          {label}
        </label>
        <p className="mt-2 text-sm text-slate-600">Drag and drop files here, or choose files from your device.</p>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="file"
          accept={accept || undefined}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInput}
          className="sr-only"
        />
      </div>

      {message && <p role="alert" className="text-sm text-red-700">{message}</p>}

      {files.length > 0 && (
        <ul aria-label="Selected files" className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {files.map((entry) => (
            <li key={entry.id} className="space-y-2 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="break-all text-sm font-medium text-slate-800">{entry.file.name}</span>
                <span role="status" className="text-sm text-slate-600">
                  {entry.status === 'complete' ? 'Complete' : entry.status === 'error' ? 'Failed' : `${entry.progress}%`}
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={`${entry.file.name} upload progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={entry.progress}
                className="h-2 overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  className={`h-full ${entry.status === 'error' ? 'bg-red-700' : 'bg-blue-700'}`}
                  style={{ width: `${entry.progress}%` }}
                />
              </div>
              {entry.error && <p role="alert" className="text-sm text-red-700">{entry.error}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
