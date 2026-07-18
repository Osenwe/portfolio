'use client';

import Skeleton from './Skeleton';

/** Loading placeholder for the messages table/card list while data loads. */
export default function SkeletonTable({ rows = 8 }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-darkHover/30"
      role="status"
      aria-label="Loading messages"
    >
      <div className="hidden border-b border-gray-200 px-6 py-3 dark:border-white/10 sm:block">
        <Skeleton className="h-4 w-32" />
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-white/10">
        {Array.from({ length: rows }).map((_, index) => (
          <li key={index} className="flex items-center gap-4 px-6 py-4">
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <Skeleton className="hidden h-3 w-16 sm:block" />
            <Skeleton className="hidden h-6 w-20 rounded-full md:block" />
          </li>
        ))}
      </ul>
    </div>
  );
}
