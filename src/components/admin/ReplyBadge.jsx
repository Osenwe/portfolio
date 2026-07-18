'use client';

import { CheckCheck, Clock } from 'lucide-react';

/** Small pill indicating whether a message has been replied to. */
export default function ReplyBadge({ replyStatus }) {
  const isReplied = replyStatus === 'replied';
  const Icon = isReplied ? CheckCheck : Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isReplied
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
          : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300'
      }`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {isReplied ? 'Replied' : 'Not Replied'}
    </span>
  );
}
