// src/app/admin/settings/page.jsx
//
// Server component wrapper (see src/app/admin/layout.jsx) - all state lives
// in SettingsPageClient.
//
// TODO(auth): protect this route once login exists.
import SettingsPageClient from '@/components/admin/SettingsPageClient';

export const metadata = {
  title: 'Settings | Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminSettingsPage() {
  return <SettingsPageClient />;
}
