'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailX } from 'lucide-react';
import {
  getMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  saveNotes,
  sendReply,
  saveDraft,
} from '@/services/messagesService';
import { useToast } from '@/context/ToastContext';
import { useSetAdminPageHeader } from '@/context/AdminPageHeaderContext';
import MessageDetailHeader from './MessageDetailHeader';
import SenderCard from './SenderCard';
import MessageBodyCard from './MessageBodyCard';
import NotesCard from './NotesCard';
import StatusControls from './StatusControls';
import ReplyForm from './ReplyForm';
import ConversationTimeline from './ConversationTimeline';
import SkeletonMessageDetail from './SkeletonMessageDetail';
import EmptyState from './EmptyState';

const STATUS_UPDATES = {
  markRead: { status: 'read' },
  markUnread: { status: 'unread' },
  archive: { status: 'archived' },
  spam: { status: 'spam' },
  restore: { status: 'read' },
};

const ACTION_TOAST_LABEL = {
  markRead: 'Marked as read',
  markUnread: 'Marked as unread',
  archive: 'Message archived',
  spam: 'Marked as spam',
  restore: 'Message restored',
};

export default function MessageDetailClient({ id }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [message, setMessage] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adjacentIds, setAdjacentIds] = useState({ prevId: null, nextId: null });

  useSetAdminPageHeader(message ? message.subject : 'Message', message ? `From ${message.name}` : '');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setNotFound(false);

    async function load() {
      const [found, all] = await Promise.all([getMessage(id), getMessages()]);
      if (!isMounted) return;

      if (!found) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const ordered = [...all].sort((a, b) => new Date(b.date) - new Date(a.date));
      const index = ordered.findIndex((m) => m.id === id);
      setAdjacentIds({
        prevId: index > 0 ? ordered[index - 1].id : null,
        nextId: index >= 0 && index < ordered.length - 1 ? ordered[index + 1].id : null,
      });

      // Opening a message marks it read, same as most email clients.
      if (found.status === 'unread') {
        const updated = await updateMessage(id, { status: 'read' });
        if (isMounted) setMessage(updated);
      } else {
        setMessage(found);
      }
      setIsLoading(false);
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAction = useCallback(
    async (type) => {
      if (!message) return;

      if (type === 'delete') {
        await deleteMessage(message.id);
        showToast('Message deleted', 'success');
        router.push('/admin/messages');
        return;
      }

      const updates = STATUS_UPDATES[type];
      if (!updates) return;
      const updated = await updateMessage(message.id, updates);
      setMessage(updated);
      showToast(ACTION_TOAST_LABEL[type], 'success');
    },
    [message, router, showToast]
  );

  const handleSaveNotes = useCallback(
    async (notesText) => {
      const updated = await saveNotes(id, notesText);
      setMessage(updated);
      return updated;
    },
    [id]
  );

  const handleSendReply = useCallback(
    async (payload) => {
      const updated = await sendReply(id, payload);
      setMessage(updated);
    },
    [id]
  );

  const handleSaveDraft = useCallback(
    async (payload) => {
      const updated = await saveDraft(id, payload);
      setMessage(updated);
    },
    [id]
  );

  if (isLoading) return <SkeletonMessageDetail />;

  if (notFound || !message) {
    return (
      <EmptyState
        icon={MailX}
        title="Message not found"
        description="This message may have been deleted, or the link is incorrect."
        action={
          <button
            type="button"
            onClick={() => router.push('/admin/messages')}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Back to Messages
          </button>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <MessageDetailHeader
        message={message}
        prevId={adjacentIds.prevId}
        nextId={adjacentIds.nextId}
        onAction={handleAction}
      />
      <SenderCard message={message} />
      <MessageBodyCard message={message.message} />
      <NotesCard notes={message.notes} notesUpdatedAt={message.notesUpdatedAt} onSave={handleSaveNotes} />
      <StatusControls message={message} onAction={handleAction} />
      <ReplyForm message={message} onSendReply={handleSendReply} onSaveDraft={handleSaveDraft} />
      <ConversationTimeline message={message} />
    </div>
  );
}
