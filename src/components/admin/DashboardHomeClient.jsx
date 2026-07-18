'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Inbox, MailOpen, CheckCheck, Archive, ChevronRight } from 'lucide-react';
import { getMessageStats, getMessages } from '@/services/messagesService';
import { useSetAdminPageHeader } from '@/context/AdminPageHeaderContext';
import StatsCard from './StatsCard';
import StatusBadge from './StatusBadge';
import Skeleton from './Skeleton';
import EmptyState from './EmptyState';

export default function DashboardHomeClient() {
  useSetAdminPageHeader('Dashboard', 'An overview of your contact form activity.');

  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      const [statsResult, messagesResult] = await Promise.all([getMessageStats(), getMessages()]);
      if (!isMounted) return;

      setStats(statsResult);
      setRecentMessages(
        [...messagesResult].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
      );
      setIsLoading(false);
    }

    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      id: 'total',
      icon: Inbox,
      title: 'Total Messages',
      count: stats?.total ?? 0,
      description: 'All submissions received',
      accent: 'blue',
    },
    {
      id: 'unread',
      icon: MailOpen,
      title: 'Unread',
      count: stats?.unread ?? 0,
      description: 'Waiting for a first look',
      accent: 'amber',
    },
    {
      id: 'replied',
      icon: CheckCheck,
      title: 'Replied',
      count: stats?.replied ?? 0,
      description: 'Messages you have responded to',
      accent: 'emerald',
    },
    {
      id: 'archived',
      icon: Archive,
      title: 'Archived',
      count: stats?.archived ?? 0,
      description: 'Filed away, out of the inbox',
      accent: 'slate',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-11 w-11 rounded-xl" />
                  <Skeleton className="h-8 w-10" />
                </div>
                <Skeleton className="mt-4 h-3.5 w-24" />
                <Skeleton className="mt-2 h-3 w-32" />
              </div>
            ))
          : cards.map((card) => <StatsCard key={card.id} {...card} />)}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-darkHover/30">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-white/10">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
          <Link
            href="/admin/messages"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-blue-400"
          >
            View all
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {isLoading ? (
          <ul className="divide-y divide-gray-200 dark:divide-white/10">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="flex items-center gap-4 px-6 py-4">
                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </li>
            ))}
          </ul>
        ) : recentMessages.length === 0 ? (
          <div className="px-6 py-4">
            <EmptyState title="No messages yet" description="New contact form submissions will show up here." />
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-white/10">
            {recentMessages.map((message) => (
              <li key={message.id}>
                <Link
                  href={`/admin/messages/${message.id}`}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                    {message.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm ${message.status === 'unread' ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                      {message.name}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{message.subject}</p>
                  </div>
                  <StatusBadge status={message.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
