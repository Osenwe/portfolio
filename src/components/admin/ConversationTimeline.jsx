'use client';

import { Mail, Send, FileText } from 'lucide-react';

const formatTimestamp = (iso) =>
  new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

const ENTRY_STYLES = {
  received: { icon: Mail, badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', dot: 'bg-blue-500' },
  sent: { icon: Send, badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', dot: 'bg-emerald-500' },
  draft: { icon: FileText, badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', dot: 'bg-amber-500' },
};

/** Original message -> replies -> drafts, in chronological order. */
export default function ConversationTimeline({ message }) {
  const entries = [
    {
      id: 'original',
      kind: 'received',
      sender: message.name,
      timestamp: message.date,
      preview: message.subject,
    },
    ...[...message.replies]
      .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
      .map((reply) => ({
        id: reply.id,
        kind: reply.type === 'draft' ? 'draft' : 'sent',
        sender: reply.sender,
        timestamp: reply.sentAt,
        preview: reply.subject,
      })),
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Conversation Timeline</h2>

      <ol className="mt-4 space-y-0">
        {entries.map((entry, index) => {
          const style = ENTRY_STYLES[entry.kind];
          const Icon = style.icon;
          const isLast = index === entries.length - 1;
          return (
            <li key={entry.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-gray-200 dark:bg-white/10"
                />
              )}
              <span className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.badge}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{entry.sender}</p>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{formatTimestamp(entry.timestamp)}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">{entry.preview}</p>
                <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${style.badge}`}>
                  {entry.kind === 'received' ? 'Received' : entry.kind === 'draft' ? 'Draft' : 'Sent'}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
