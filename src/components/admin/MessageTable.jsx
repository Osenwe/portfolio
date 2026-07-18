'use client';

import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';
import ReplyBadge from './ReplyBadge';
import CategoryBadge from './CategoryBadge';
import RowActionsMenu from './RowActionsMenu';
import MessageCard from './MessageCard';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/**
 * Message list: a full table on lg+ screens, a stacked card list below that.
 * `onRowAction(type, id)` handles mark-read/unread/archive/spam/restore/delete
 * for a single row; bulk equivalents live in BulkActionsBar instead.
 */
export default function MessageTable({ messages, selectedIds, onToggleSelect, onToggleSelectAll, onRowAction }) {
  const router = useRouter();
  const allSelected = messages.length > 0 && messages.every((m) => selectedIds.has(m.id));

  const buildActions = (message) => ({
    onMarkRead: () => onRowAction('markRead', message.id),
    onMarkUnread: () => onRowAction('markUnread', message.id),
    onArchive: () => onRowAction('archive', message.id),
    onSpam: () => onRowAction('spam', message.id),
    onRestore: () => onRowAction('restore', message.id),
    onDelete: () => onRowAction('delete', message.id),
  });

  return (
    <>
      {/* Desktop / laptop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-darkHover/30 lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500 dark:border-white/10 dark:text-gray-400">
              <th scope="col" className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all messages on this page"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/30 dark:bg-transparent"
                />
              </th>
              <th scope="col" className="px-3 py-3 font-medium">Status</th>
              <th scope="col" className="px-3 py-3 font-medium">Sender</th>
              <th scope="col" className="px-3 py-3 font-medium">Email</th>
              <th scope="col" className="px-3 py-3 font-medium">Subject</th>
              <th scope="col" className="px-3 py-3 font-medium">Preview</th>
              <th scope="col" className="px-3 py-3 font-medium">Date</th>
              <th scope="col" className="px-3 py-3 font-medium">Category</th>
              <th scope="col" className="px-3 py-3 font-medium">Reply Status</th>
              <th scope="col" className="w-12 px-3 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {messages.map((message) => {
              const isUnread = message.status === 'unread';
              return (
                <tr
                  key={message.id}
                  onClick={() => router.push(`/admin/messages/${message.id}`)}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${
                    isUnread ? 'bg-blue-50/40 dark:bg-blue-950/10' : ''
                  }`}
                >
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(message.id)}
                      onChange={() => onToggleSelect(message.id)}
                      aria-label={`Select message from ${message.name}`}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/30 dark:bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={message.status} />
                  </td>
                  <td className="px-3 py-3">
                    <span className={`whitespace-nowrap ${isUnread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {message.name}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-500 dark:text-gray-400">
                    <span className="block max-w-[180px] truncate">{message.email}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`block max-w-[220px] truncate ${isUnread ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {message.subject}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-500 dark:text-gray-400">
                    <span className="block max-w-[220px] truncate">{message.message}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(message.date)}
                  </td>
                  <td className="px-3 py-3">
                    <CategoryBadge category={message.category} />
                  </td>
                  <td className="px-3 py-3">
                    <ReplyBadge replyStatus={message.replyStatus} />
                  </td>
                  <td className="px-3 py-3" onClick={(event) => event.stopPropagation()}>
                    <RowActionsMenu message={message} {...buildActions(message)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tablet / mobile card list */}
      <div className="space-y-3 lg:hidden">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            selected={selectedIds.has(message.id)}
            onToggleSelect={onToggleSelect}
            actions={buildActions(message)}
          />
        ))}
      </div>
    </>
  );
}
