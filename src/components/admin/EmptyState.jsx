'use client';

import { Inbox } from 'lucide-react';

/**
 * Reusable empty state for "no messages", "no search results", "no results
 * for this filter", etc. Pass a lucide-react icon component via `icon`.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-darkHover/30">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
