// src/app/admin/messages/page.jsx
//
// Server component wrapper (see src/app/admin/layout.jsx) - all state lives
// in MessagesPageClient. Supports an optional ?status= query param (unread,
// archived, spam) used by the sidebar's quick-filter links.
//
// TODO(auth): protect this route once login exists.
import MessagesPageClient from '@/components/admin/MessagesPageClient';

export const metadata = {
  title: 'Messages | Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminMessagesPage() {
  return <MessagesPageClient />;
}
