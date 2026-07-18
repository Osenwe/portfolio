'use client';

import { useEffect, useRef, useState } from 'react';
import { MoreVertical, Mail, MailOpen, Archive, ShieldAlert, RotateCcw, Trash2 } from 'lucide-react';

/**
 * Per-row "…" actions menu used in the messages table/cards. Actions shown
 * adapt to the message's current status (e.g. archived/spam rows get a
 * "Restore" action instead of Archive/Spam).
 */
export default function RowActionsMenu({ message, onMarkRead, onMarkUnread, onArchive, onSpam, onRestore, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const isFiled = message.status === 'archived' || message.status === 'spam';

  const items = [
    message.status === 'unread'
      ? { label: 'Mark as Read', icon: MailOpen, onClick: onMarkRead }
      : { label: 'Mark as Unread', icon: Mail, onClick: onMarkUnread },
    ...(isFiled
      ? [{ label: 'Restore', icon: RotateCcw, onClick: onRestore }]
      : [
          { label: 'Archive', icon: Archive, onClick: onArchive },
          { label: 'Mark as Spam', icon: ShieldAlert, onClick: onSpam },
        ]),
    { label: 'Delete', icon: Trash2, onClick: onDelete, danger: true },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Actions for message from ${message.name}`}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-white/10 dark:hover:text-gray-200"
      >
        <MoreVertical className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          onClick={(event) => event.stopPropagation()}
          className="absolute right-0 z-30 mt-1 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl dark:border-white/10 dark:bg-darkHover"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm transition-colors ${
                item.danger
                  ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5'
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
