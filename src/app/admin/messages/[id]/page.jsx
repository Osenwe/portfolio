// src/app/admin/messages/[id]/page.jsx
//
// Server component wrapper (see src/app/admin/layout.jsx) - all state lives
// in MessageDetailClient. `params` is async per the Next.js App Router
// convention for server component pages, so it's awaited below.
//
// TODO(auth): protect this route once login exists.
import MessageDetailClient from '@/components/admin/MessageDetailClient';

export const metadata = {
  title: 'Message | Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminMessageDetailPage({ params }) {
  const { id } = await params;
  return <MessageDetailClient id={id} />;
}
