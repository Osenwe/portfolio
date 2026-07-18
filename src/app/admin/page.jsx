// src/app/admin/page.jsx
//
// Server component wrapper (see src/app/admin/layout.jsx for why) - all the
// real UI/state lives in DashboardHomeClient.
//
// TODO(auth): once login exists, this route (and every route under /admin)
// should redirect unauthenticated visitors to a login page instead of
// rendering the dashboard.
import DashboardHomeClient from '@/components/admin/DashboardHomeClient';

export const metadata = {
  title: 'Dashboard | Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminDashboardPage() {
  return <DashboardHomeClient />;
}
