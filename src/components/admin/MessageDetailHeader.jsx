'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronUp, ChevronDown, MoreVertical, Mail, MailOpen, Archive, ShieldAlert, RotateCcw, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

/** Header for the message detail page: back nav, subject/status, prev/next, actions menu. */
export default function MessageDetailHeader({ message, prevId, nextId, onAction }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const isFiled = message.status === 'archived' || message.status === 'spam';

  const menuItems = [
    message.status === 'unread'
      ? { label: 'Mark as Read', icon: MailOpen, onClick: () => onAction('markRead') }
      : { label: 'Mark as Unread', icon: Mail, onClick: () => onAction('markUnread') },
    ...(isFiled
      ? [{ label: 'Restore', icon: RotateCcw, onClick: () => onAction('restore') }]
      : [
          { label: 'Archive', icon: Archive, onClick: () => onAction('archive') },
          { label: 'Mark as Spam', icon: ShieldAlert, onClick: () => onAction('spam') },
        ]),
    { label: 'Delete', icon: Trash2, onClick: () => onAction('delete'), danger: true },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin/messages')}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-300 dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Messages
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => prevId && router.push(`/admin/messages/${prevId}`)}
            disabled={!prevId}
            aria-label="Previous message"
            title="Previous message"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nextId && router.push(`/admin/messages/${nextId}`)}
            disabled={!nextId}
            aria-label="Next message"
            title="Next message"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="relative ml-1" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="More actions"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-white/10"
            >
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
            </button>
            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-30 mt-1 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl dark:border-white/10 dark:bg-darkHover"
              >
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
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
        </div>
      </div>

      <h1 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">{message.subject}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <StatusBadge status={message.status} />
        <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(message.date)}</span>
      </div>
    </div>
  );
}
