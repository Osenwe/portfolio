'use client';

import { useState } from 'react';
import { Mail, MailOpen, Archive, ShieldAlert, RotateCcw, Trash2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

/** Status action buttons on the message detail page (mirrors the row/header actions menu, but always visible). */
export default function StatusControls({ message, onAction }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isFiled = message.status === 'archived' || message.status === 'spam';

  const buttons = [
    { key: 'markRead', label: 'Read', icon: MailOpen, disabled: message.status === 'read' },
    { key: 'markUnread', label: 'Unread', icon: Mail, disabled: message.status === 'unread' },
    { key: 'archive', label: 'Archive', icon: Archive, disabled: message.status === 'archived' },
    { key: 'spam', label: 'Spam', icon: ShieldAlert, disabled: message.status === 'spam' },
    { key: 'restore', label: 'Restore', icon: RotateCcw, disabled: !isFiled },
  ];

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await onAction('delete');
    setIsDeleting(false);
    setDeleteOpen(false);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Status</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {buttons.map((button) => (
          <button
            key={button.key}
            type="button"
            onClick={() => onAction(button.key)}
            disabled={button.disabled}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
          >
            <button.icon className="h-3.5 w-3.5" aria-hidden="true" />
            {button.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete this message?"
        description="This action can't be undone. The message and any saved notes or replies will be permanently removed."
        confirmLabel="Delete"
        tone="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
