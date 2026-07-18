'use client';

import { Calendar } from 'lucide-react';
import { MESSAGE_CATEGORIES } from '@/data/messageCategories';

export const QUICK_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'read', label: 'Read' },
  { value: 'unread', label: 'Unread' },
  { value: 'replied', label: 'Replied' },
  { value: 'not-replied', label: 'Not Replied' },
  { value: 'archived', label: 'Archived' },
  { value: 'spam', label: 'Spam' },
];

/** Quick-filter chips + category dropdown + a date-range placeholder. */
export default function FilterBar({ quickFilter, onQuickFilterChange, category, onCategoryChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter messages">
        {QUICK_FILTERS.map((filter) => {
          const active = quickFilter === filter.value;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onQuickFilterChange(filter.value)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                active
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filter by category"
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-gray-200"
        >
          <option value="all">All Categories</option>
          {MESSAGE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Placeholder: date-range filtering isn't implemented yet */}
        <button
          type="button"
          disabled
          title="Date range filter - coming soon"
          className="flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-400 dark:border-white/10 dark:text-gray-500"
        >
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          Date range
        </button>
      </div>
    </div>
  );
}
