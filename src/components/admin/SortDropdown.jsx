'use client';

import { ArrowUpDown } from 'lucide-react';

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'subject', label: 'Subject (A-Z)' },
  { value: 'unread-first', label: 'Unread First' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Sort messages"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-gray-200"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
