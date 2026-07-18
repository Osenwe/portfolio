'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Search, Bell, ChevronDown, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

/**
 * Top header shared by every /admin page. `title`/`description` describe the
 * current page; the mobile hamburger opens AdminMobileNav via the callback
 * lifted up from AdminLayoutClient.
 */
export default function AdminHeader({ title, description, onOpenMobileNav }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const { user, logout } = useAdminAuth();

  const handleSignOut = async () => {
    setProfileOpen(false);
    await logout();
    router.push('/admin/login');
  };

  useEffect(() => {
    if (!profileOpen) return;
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-white/10 dark:bg-darkTheme/80 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Open navigation menu"
          className="shrink-0 rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-300 dark:hover:bg-white/10 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">{title}</h1>
          {description && (
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Placeholder: global search across messages - not wired up yet */}
        <button
          type="button"
          aria-label="Search (coming soon)"
          title="Global search - coming soon"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-white/10"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Placeholder: notifications - not wired up yet */}
        <button
          type="button"
          aria-label="Notifications (coming soon)"
          title="Notifications - coming soon"
          className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-white/10"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-1.5 rounded-lg p-1.5 pr-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-white/10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-semibold text-white">
              AB
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl dark:border-white/10 dark:bg-darkHover"
            >
              <div className="border-b border-gray-100 px-4 py-2.5 dark:border-white/10">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.isOwner ? 'Owner' : 'Admin'}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <Link
                href="/admin/settings"
                role="menuitem"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Profile
              </Link>
              <Link
                href="/admin/settings"
                role="menuitem"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5"
              >
                <SettingsIcon className="h-4 w-4" aria-hidden="true" />
                Settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
