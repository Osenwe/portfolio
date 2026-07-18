'use client';

import { useState } from 'react';
import { StickyNote } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

const formatTimestamp = (iso) =>
  new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

/** Admin-only private notes on a message. Never shown to or sent to the sender. */
export default function NotesCard({ notes, notesUpdatedAt, onSave }) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState(notes || '');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(notesUpdatedAt);

  const isDirty = draft !== (notes || '');

  const handleSave = async () => {
    setIsSaving(true);
    const updated = await onSave(draft);
    setIsSaving(false);
    setLastSavedAt(updated?.notesUpdatedAt || new Date().toISOString());
    showToast('Notes saved', 'success');
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <div className="flex items-center gap-2">
        <StickyNote className="h-4 w-4 text-amber-500" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Private Notes</h2>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Only visible to you - never included in replies sent to the sender.
      </p>

      <label htmlFor="private-notes" className="sr-only">Private notes</label>
      <textarea
        id="private-notes"
        rows={4}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Add a private note about this message…"
        className="mt-3 w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white dark:placeholder-gray-500"
      />

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {lastSavedAt ? `Last saved ${formatTimestamp(lastSavedAt)}` : 'Not saved yet'}
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          {isSaving ? 'Saving…' : 'Save Note'}
        </button>
      </div>
    </div>
  );
}
