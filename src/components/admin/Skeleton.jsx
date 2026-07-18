'use client';

/** Base pulsing skeleton bar - compose into larger skeleton layouts. */
export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-white/10 ${className}`} aria-hidden="true" />;
}
