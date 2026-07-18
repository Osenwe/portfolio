'use client';

import { useState } from 'react';
import { Mail, Copy, Check, Globe, Monitor } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import { useToast } from '@/context/ToastContext';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function SenderCard({ message }) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(message.email);
      setCopied(true);
      showToast('Email address copied', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy email address', 'error');
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-base font-semibold text-white">
          {message.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-gray-900 dark:text-white">{message.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${message.email}`}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-blue-400"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {message.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-white/10"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-gray-100 pt-4 text-sm dark:border-white/10 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Category</dt>
          <dd className="mt-1"><CategoryBadge category={message.category} /></dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Date Received</dt>
          <dd className="mt-1 text-gray-700 dark:text-gray-300">{formatDate(message.date)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Source</dt>
          <dd className="mt-1 text-gray-700 dark:text-gray-300">{message.source}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            <Globe className="h-3 w-3" aria-hidden="true" /> IP Address
          </dt>
          {/* Placeholder - populated once the FastAPI backend captures request metadata */}
          <dd className="mt-1 text-gray-400 dark:text-gray-500">{message.ipAddress || '—'}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            <Monitor className="h-3 w-3" aria-hidden="true" /> Browser
          </dt>
          {/* Placeholder - populated once the FastAPI backend captures request metadata */}
          <dd className="mt-1 text-gray-400 dark:text-gray-500">{message.browser || '—'}</dd>
        </div>
      </dl>
    </div>
  );
}
