'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Generic confirmation modal, controlled entirely by the caller's own state.
 * Used for destructive actions (delete message, bulk delete, etc).
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    confirmButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  const isDanger = tone === 'danger';

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-darkHover"
      >
        <div className="flex items-start gap-3">
          {isDanger && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <div>
            <h2 id="confirm-dialog-title" className="text-base font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            {description && (
              <p id="confirm-dialog-description" className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/20 dark:text-gray-200 dark:hover:bg-white/5"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700 focus-visible:outline-red-500'
                : 'bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-500'
            }`}
          >
            {isLoading ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
