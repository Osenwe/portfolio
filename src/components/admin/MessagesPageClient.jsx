'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Inbox, SearchX, FilterX } from 'lucide-react';
import {
  getMessages,
  updateMessage,
  bulkUpdateMessages,
  deleteMessage,
  bulkDeleteMessages,
} from '@/services/messagesService';
import { useToast } from '@/context/ToastContext';
import { useSetAdminPageHeader } from '@/context/AdminPageHeaderContext';
import SearchBar from './SearchBar';
import FilterBar, { QUICK_FILTERS } from './FilterBar';
import SortDropdown from './SortDropdown';
import MessageTable from './MessageTable';
import Pagination from './Pagination';
import BulkActionsBar from './BulkActionsBar';
import EmptyState from './EmptyState';
import SkeletonTable from './SkeletonTable';
import ConfirmDialog from './ConfirmDialog';

const matchesQuickFilter = (message, quickFilter) => {
  switch (quickFilter) {
    case 'read':
      return message.status === 'read';
    case 'unread':
      return message.status === 'unread';
    case 'archived':
      return message.status === 'archived';
    case 'spam':
      return message.status === 'spam';
    case 'replied':
      return message.replyStatus === 'replied';
    case 'not-replied':
      return message.replyStatus === 'not-replied';
    default:
      return true;
  }
};

const sortMessages = (messages, sortBy) => {
  const sorted = [...messages];
  switch (sortBy) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'subject':
      return sorted.sort((a, b) => a.subject.localeCompare(b.subject));
    case 'unread-first':
      return sorted.sort((a, b) => {
        if (a.status === 'unread' && b.status !== 'unread') return -1;
        if (a.status !== 'unread' && b.status === 'unread') return 1;
        return new Date(b.date) - new Date(a.date);
      });
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

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

export default function MessagesPageClient() {
  useSetAdminPageHeader('Messages', 'All contact form submissions in one place.');

  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'single'|'bulk', id?, ids? }
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getMessages().then((data) => {
      if (!isMounted) return;
      setMessages(data);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync the sidebar's Unread/Archived/Spam shortcuts (?status=) into the quick filter.
  useEffect(() => {
    const statusParam = searchParams.get('status');
    const isValidStatusFilter = QUICK_FILTERS.some((f) => f.value === statusParam);
    setQuickFilter(isValidStatusFilter ? statusParam : 'all');
  }, [searchParams]);

  const filteredMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return messages.filter((message) => {
      const matchesSearch =
        !query ||
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || message.category === category;
      return matchesSearch && matchesCategory && matchesQuickFilter(message, quickFilter);
    });
  }, [messages, searchQuery, category, quickFilter]);

  const sortedMessages = useMemo(() => sortMessages(filteredMessages, sortBy), [filteredMessages, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedMessages.length / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageMessages = sortedMessages.slice(
    (safeCurrentPage - 1) * rowsPerPage,
    safeCurrentPage * rowsPerPage
  );

  // Reset to page 1 whenever the result set could have changed shape.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, quickFilter, category, sortBy, rowsPerPage]);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      const allOnPageSelected = pageMessages.length > 0 && pageMessages.every((m) => prev.has(m.id));
      if (allOnPageSelected) {
        const next = new Set(prev);
        pageMessages.forEach((m) => next.delete(m.id));
        return next;
      }
      const next = new Set(prev);
      pageMessages.forEach((m) => next.add(m.id));
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMessages]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const applyLocalUpdate = (ids, updates) => {
    const idSet = new Set(ids);
    setMessages((prev) => prev.map((m) => (idSet.has(m.id) ? { ...m, ...updates } : m)));
  };

  const handleRowAction = async (type, id) => {
    if (type === 'delete') {
      setDeleteTarget({ type: 'single', id });
      return;
    }
    const updates = STATUS_UPDATES[type];
    if (!updates) return;
    await updateMessage(id, updates);
    applyLocalUpdate([id], updates);
    showToast(ACTION_TOAST_LABEL[type], 'success');
  };

  const runBulkStatusUpdate = async (type) => {
    const ids = [...selectedIds];
    if (ids.length === 0) return;
    const updates = STATUS_UPDATES[type];
    await bulkUpdateMessages(ids, updates);
    applyLocalUpdate(ids, updates);
    showToast(`${ACTION_TOAST_LABEL[type]} for ${ids.length} message${ids.length > 1 ? 's' : ''}`, 'success');
    clearSelection();
  };

  const handleBulkDeleteRequest = () => {
    if (selectedIds.size === 0) return;
    setDeleteTarget({ type: 'bulk', ids: [...selectedIds] });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    if (deleteTarget.type === 'single') {
      await deleteMessage(deleteTarget.id);
      setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      showToast('Message deleted', 'success');
    } else {
      await bulkDeleteMessages(deleteTarget.ids);
      const idSet = new Set(deleteTarget.ids);
      setMessages((prev) => prev.filter((m) => !idSet.has(m.id)));
      showToast(`${deleteTarget.ids.length} messages deleted`, 'success');
      clearSelection();
    }
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const hasActiveSearchOrFilter = searchQuery.trim() !== '' || quickFilter !== 'all' || category !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <FilterBar
        quickFilter={quickFilter}
        onQuickFilterChange={setQuickFilter}
        category={category}
        onCategoryChange={setCategory}
      />

      <BulkActionsBar
        selectedCount={selectedIds.size}
        onMarkRead={() => runBulkStatusUpdate('markRead')}
        onMarkUnread={() => runBulkStatusUpdate('markUnread')}
        onArchive={() => runBulkStatusUpdate('archive')}
        onSpam={() => runBulkStatusUpdate('spam')}
        onDelete={handleBulkDeleteRequest}
        onClearSelection={clearSelection}
      />

      {isLoading ? (
        <SkeletonTable />
      ) : messages.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No messages yet"
          description="Once visitors submit your contact form, their messages will show up here."
        />
      ) : sortedMessages.length === 0 ? (
        <EmptyState
          icon={hasActiveSearchOrFilter ? (searchQuery ? SearchX : FilterX) : Inbox}
          title={searchQuery ? 'No results found' : 'No messages match this filter'}
          description={
            searchQuery
              ? `Nothing matches "${searchQuery}". Try a different search term.`
              : 'Try a different filter or clear your current filters to see more messages.'
          }
          action={
            hasActiveSearchOrFilter && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setQuickFilter('all');
                  setCategory('all');
                }}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Clear filters
              </button>
            )
          }
        />
      ) : (
        <div>
          <MessageTable
            messages={pageMessages}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onToggleSelectAll={toggleSelectAll}
            onRowAction={handleRowAction}
          />
          <div className="hidden lg:block rounded-b-2xl border border-t-0 border-gray-200 bg-white dark:border-white/10 dark:bg-darkHover/30">
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={sortedMessages.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
          <div className="mt-3 rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-darkHover/30 lg:hidden">
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={sortedMessages.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={deleteTarget?.type === 'bulk' ? `Delete ${deleteTarget.ids.length} messages?` : 'Delete this message?'}
        description="This action can't be undone. The message and any saved notes or replies will be permanently removed."
        confirmLabel="Delete"
        tone="danger"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
