'use client';

import Skeleton from './Skeleton';

/** Loading placeholder for the message detail page while data loads. */
export default function SkeletonMessageDetail() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading message">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-darkHover/30">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="mt-3 h-3.5 w-1/4" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-darkHover/30">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-darkHover/30 space-y-3">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>
    </div>
  );
}
