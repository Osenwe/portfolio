'use client';

// Catches render-time errors anywhere under /admin (e.g. a message with
// unexpected/missing fields) so the dashboard shows a recoverable screen
// instead of silently going blank.
export default function AdminError({ error, reset }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Something went wrong</h1>
      <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {error?.message || 'This page hit an unexpected error while rendering.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        Try again
      </button>
    </div>
  );
}
