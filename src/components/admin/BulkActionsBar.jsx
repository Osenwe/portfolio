'use client';

import { Mail, MailOpen, Archive, ShieldAlert, Trash2, X } from 'lucide-react';

/** Appears above the message list once one or more rows are selected. */
export default function BulkActionsBar({
  selectedCount,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onSpam,
  onDelete,
  onClearSelection,
}) {
  if (selectedCount === 0) return null;

  const actions = [
    { label: 'Mark Read', icon: MailOpen, onClick: onMarkRead },
    { label: 'Mark Unread', icon: Mail, onClick: onMarkUnread },
    { label: 'Archive', icon: Archive, onClick: onArchive },
    { label: 'Spam', icon: ShieldAlert, onClick: onSpam },
    { label: 'Delete', icon: Trash2, onClick: onDelete, danger: true },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/40">
      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
        {selectedCount} selected
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              action.danger
                ? 'border-red-200 bg-white text-red-600 hover:bg-red-50 focus-visible:outline-red-500 dark:border-red-900/50 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/40'
                : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-100 focus-visible:outline-blue-500 dark:border-blue-900/50 dark:bg-transparent dark:text-blue-300 dark:hover:bg-blue-900/40'
            }`}
          >
            <action.icon className="h-3.5 w-3.5" aria-hidden="true" />
            {action.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearSelection}
        aria-label="Clear selection"
        className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-blue-300 dark:hover:bg-blue-900/40"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
        Clear
      </button>
    </div>
  );
}
