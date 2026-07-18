'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
import { ADMIN_NAV_ITEMS } from './adminNavConfig';

function isNavItemActive(item, pathname, statusParam) {
  if (item.href === '/admin') return pathname === '/admin';
  if (item.status) return pathname === '/admin/messages' && statusParam === item.status;
  if (item.href === '/admin/messages') return pathname === '/admin/messages' && !statusParam;
  return pathname === item.href;
}

/** Mobile drawer navigation - the sidebar's small-screen equivalent. */
export default function AdminMobileNav({ open, onClose }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className="absolute left-0 top-0 flex h-full w-72 max-w-[85%] flex-col bg-white shadow-2xl dark:bg-darkTheme"
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-5 py-4 dark:border-white/10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white">
              AB
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">benyeogorosenwe.com</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-white/10"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
          {ADMIN_NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item, pathname, statusParam);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                  active
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 px-3 py-4 dark:border-white/10">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
