'use client';

import { MESSAGE_CATEGORIES } from '@/data/messageCategories';

const CATEGORY_COLORS = {
  'general-inquiry': 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300',
  'research-collaboration': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'speaking-invitation': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'technical-support': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  employment: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  other: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300',
};

/** Small pill showing a message's category. */
export default function CategoryBadge({ category }) {
  const label = MESSAGE_CATEGORIES.find((c) => c.value === category)?.label || 'Other';
  const className = CATEGORY_COLORS[category] || CATEGORY_COLORS.other;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
