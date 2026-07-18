// src/app/admin/layout.jsx
//
// Server component wrapper for the whole /admin area. Kept as a server
// component (no 'use client') solely so it can export `metadata` - the
// interactive shell (sidebar, mobile drawer, header, toasts) lives in
// AdminLayoutClient instead.
//
// TODO(auth): this entire /admin tree is unprotected right now. Before going
// live, add real authentication here (or in middleware.js), e.g.:
//   - check a session cookie / JWT on the server and redirect to a login
//     route if it's missing/invalid, or
//   - wrap AdminLayoutClient in an auth guard that checks a session context
//     and redirects client-side.
// Hiding these pages from search engines (see `metadata` below) is NOT a
// substitute for authentication - it only stops crawlers from indexing the
// URLs, it does nothing to stop a person who guesses/finds the URL.
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export const metadata = {
  title: 'Admin Dashboard | benyeogorosenwe.com',
  description: 'Private admin dashboard.',
  // Keep the entire /admin tree out of search engines. See public/robots.txt
  // for the matching Disallow rule (defense in depth, not a security control).
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
