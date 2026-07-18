'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ADMIN_NAV_ITEMS } from './adminNavConfig';

function isNavItemActive(item, pathname, statusParam) {
  if (item.href === '/admin') return pathname === '/admin';
  if (item.status) return pathname === '/admin/messages' && statusParam === item.status;
  if (item.href === '/admin/messages') return pathname === '/admin/messages' && !statusParam;
  return pathname === item.href;
}

/** Persistent desktop sidebar. Hidden below the lg breakpoint (see AdminMobileNav). */
export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');

  return (
    <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white dark:lg:border-white/10 dark:lg:bg-darkTheme">
      <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-5 dark:border-white/10">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
          AB
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">benyeogorosenwe.com</p>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, pathname, statusParam);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
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
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
