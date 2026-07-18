// src/app/admin/login/page.jsx
//
// Public route (no auth required to reach the login form itself). Rendered
// without the sidebar/header chrome - see AdminLayoutClient's gate logic.
import LoginPageClient from '@/components/admin/LoginPageClient';

export const metadata = {
  title: 'Sign In | Admin',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLoginPage() {
  return <LoginPageClient />;
}
