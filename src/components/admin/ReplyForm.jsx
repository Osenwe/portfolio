'use client';

import { useState } from 'react';
import { Paperclip, Send, Save } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

const buildDefaults = (message) => ({
  to: message.email,
  subject: message.subject.startsWith('Re:') ? message.subject : `Re: ${message.subject}`,
  cc: '',
  bcc: '',
  body: '',
});

/** Reply composer below the message thread. Sending/saving currently just updates local mock state. */
export default function ReplyForm({ message, onSendReply, onSaveDraft }) {
  const { showToast } = useToast();
  const [form, setForm] = useState(() => buildDefaults(message));
  const [isSending, setIsSending] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const updateField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleCancel = () => setForm(buildDefaults(message));

  const handleSend = async (event) => {
    event.preventDefault();
    if (!form.body.trim()) {
      showToast('Write a reply before sending', 'error');
      return;
    }

    setIsSending(true);
    try {
      // TODO(FastAPI): POST /api/admin/messages/{id}/reply - the backend will
      // actually dispatch this as an email (SMTP/SendGrid/etc). sendReply()
      // in messagesService.js is the single place that call gets added.
      await onSendReply(form);
      showToast('Reply sent', 'success');
      setForm(buildDefaults(message));
    } catch {
      showToast('Failed to send reply. Please try again.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!form.body.trim() && !form.cc && !form.bcc) {
      showToast('Nothing to save yet', 'info');
      return;
    }
    setIsSavingDraft(true);
    try {
      await onSaveDraft(form);
      showToast('Draft saved', 'success');
    } catch {
      showToast('Failed to save draft', 'error');
    } finally {
      setIsSavingDraft(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Reply</h2>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="reply-to" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">To</label>
          <input
            id="reply-to"
            type="email"
            value={form.to}
            onChange={updateField('to')}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="reply-subject" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Subject</label>
          <input
            id="reply-subject"
            type="text"
            value={form.subject}
            onChange={updateField('subject')}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="reply-cc" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">CC</label>
            <input
              id="reply-cc"
              type="text"
              value={form.cc}
              onChange={updateField('cc')}
              placeholder="Optional"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="reply-bcc" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">BCC</label>
            <input
              id="reply-bcc"
              type="text"
              value={form.bcc}
              onChange={updateField('bcc')}
              placeholder="Optional"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reply-body" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Message</label>
          <textarea
            id="reply-body"
            rows={7}
            value={form.body}
            onChange={updateField('body')}
            placeholder={`Write your reply to ${message.name}…`}
            className="w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Placeholder: attachments aren't implemented yet */}
        <button
          type="button"
          disabled
          title="Attachments - coming soon"
          className="flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-400 dark:border-white/10 dark:text-gray-500"
        >
          <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
          Attach file
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            {isSavingDraft ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            type="submit"
            disabled={isSending}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
            {isSending ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
    </form>
  );
}
