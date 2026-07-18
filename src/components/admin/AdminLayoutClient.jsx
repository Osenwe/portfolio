'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ToastProvider } from '@/context/ToastContext';
import { AdminPageHeaderProvider, useAdminPageHeader } from '@/context/AdminPageHeaderContext';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
import AdminSidebar from './AdminSidebar';
import AdminMobileNav from './AdminMobileNav';
import AdminHeader from './AdminHeader';

function AdminChrome({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { title, description } = useAdminPageHeader();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-darkTheme">
      <AdminSidebar />
      <AdminMobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={title}
          description={description}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

function AdminAuthGate({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAdminAuth();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoading || isLoginPage) return;
    if (!user) router.replace('/admin/login');
  }, [isLoading, isLoginPage, user, router]);

  // The login page renders on its own, with no sidebar/header chrome.
  if (isLoginPage) return children;

  // Real access control happens per-request on the backend (every
  // /api/admin/* route requires a valid session - see
  // backend_fastapi/app/deps.py). This client-side gate is just UX so an
  // unauthenticated visitor doesn't see a flash of the dashboard shell
  // before being redirected to /admin/login.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-darkTheme">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-white/20 dark:border-t-white"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!user) return null; // redirect effect above is in flight

  return <AdminChrome>{children}</AdminChrome>;
}

/**
 * Client-side shell for the whole /admin area: auth gate + sidebar + mobile
 * drawer + header + toast/notification system. Split out from
 * src/app/admin/layout.jsx (a server component) because it needs hooks
 * (usePathname, useState) and a server component can't use those while
 * still exporting `metadata`.
 */
export default function AdminLayoutClient({ children }) {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminPageHeaderProvider>
          {/* useSearchParams (used by AdminSidebar/AdminMobileNav for active-link
              highlighting) requires a Suspense boundary in the App Router. */}
          <Suspense fallback={null}>
            <AdminAuthGate>{children}</AdminAuthGate>
          </Suspense>
        </AdminPageHeaderProvider>
      </ToastProvider>
    </AdminAuthProvider>
  );
}
