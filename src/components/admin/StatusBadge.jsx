'use client';

const STATUS_CONFIG = {
  unread: {
    label: 'Unread',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  read: {
    label: 'Read',
    className: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300',
    dot: 'bg-gray-400',
  },
  archived: {
    label: 'Archived',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  spam: {
    label: 'Spam',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    dot: 'bg-red-500',
  },
};

/** Small status pill used in the table, detail header, and filters. */
export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.read;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}
