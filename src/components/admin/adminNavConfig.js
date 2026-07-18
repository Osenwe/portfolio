import { LayoutDashboard, Inbox, MailOpen, Archive, ShieldAlert, Settings } from 'lucide-react';

// Shared nav config for AdminSidebar (desktop) and AdminMobileNav (drawer).
// `status` (when present) is matched against ?status= on /admin/messages to
// highlight the right item and to preset the messages page filter.
export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Messages', href: '/admin/messages', icon: Inbox },
  { label: 'Unread', href: '/admin/messages?status=unread', icon: MailOpen, status: 'unread' },
  { label: 'Archived', href: '/admin/messages?status=archived', icon: Archive, status: 'archived' },
  { label: 'Spam', href: '/admin/messages?status=spam', icon: ShieldAlert, status: 'spam' },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];
