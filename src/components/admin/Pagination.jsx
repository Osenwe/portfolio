'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

function getVisiblePages(currentPage, totalPages) {
  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  return [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  if (totalItems === 0) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-4 py-4 dark:border-white/10 sm:flex-row sm:px-6">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <label htmlFor="rows-per-page" className="whitespace-nowrap">
          Rows per page
        </label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-gray-200"
        >
          {ROWS_PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Previous
        </button>

        {visiblePages.map((page, index) => {
          const prevPage = visiblePages[index - 1];
          const showEllipsis = prevPage && page - prevPage > 1;
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-xs text-gray-400">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                  page === currentPage
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            </span>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
