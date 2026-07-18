'use client';

import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';
import ReplyBadge from './ReplyBadge';
import CategoryBadge from './CategoryBadge';
import RowActionsMenu from './RowActionsMenu';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/** Mobile card representation of a message row (used below the sm breakpoint). */
export default function MessageCard({ message, selected, onToggleSelect, actions }) {
  const router = useRouter();
  const isUnread = message.status === 'unread';

  return (
    <div
      onClick={() => router.push(`/admin/messages/${message.id}`)}
      className={`cursor-pointer rounded-xl border p-4 transition-colors ${
        isUnread
          ? 'border-blue-200 bg-blue-50/50 dark:border-blue-900/40 dark:bg-blue-950/20'
          : 'border-gray-200 bg-white dark:border-white/10 dark:bg-darkHover/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(message.id)}
          onClick={(event) => event.stopPropagation()}
          aria-label={`Select message from ${message.name}`}
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/30 dark:bg-transparent"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={`truncate text-sm ${isUnread ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
              {message.name}
            </p>
            <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">{formatDate(message.date)}</span>
          </div>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{message.email}</p>
          <p className={`mt-1.5 truncate text-sm ${isUnread ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
            {message.subject}
          </p>
          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">{message.message}</p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={message.status} />
            <ReplyBadge replyStatus={message.replyStatus} />
            <CategoryBadge category={message.category} />
          </div>
        </div>

        <div onClick={(event) => event.stopPropagation()}>
          <RowActionsMenu message={message} {...actions} />
        </div>
      </div>
    </div>
  );
}
