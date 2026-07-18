// src/services/messagesService.js
//
// Talks to the real FastAPI backend (backend_fastapi/) - every function here
// used to return mock data from src/data/mockMessages.js; that mock store is
// gone now that the backend exists. Component code (MessagesPageClient,
// MessageDetailClient, DashboardHomeClient, ...) didn't need to change at
// all, since these functions kept the exact same names/signatures.
//
// Auth (cookies + CSRF header) and the API base URL are handled by
// src/utils/adminFetch.js / src/config/adminApi.js - nothing here talks to
// `fetch()` directly.

import { ADMIN_API_CONFIG } from '@/config/adminApi';
import { adminFetch, AdminApiError } from '@/utils/adminFetch';

const { endpoints } = ADMIN_API_CONFIG;

export async function getMessages() {
  return adminFetch(endpoints.messages);
}

export async function getMessage(id) {
  try {
    return await adminFetch(endpoints.message(id));
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) return null;
    throw error;
  }
}

/** `updates` is always `{ status }` in this app - see STATUS_UPDATES in MessagesPageClient/MessageDetailClient. */
export async function updateMessage(id, updates) {
  return adminFetch(endpoints.messageStatus(id), { method: 'PATCH', json: { status: updates.status } });
}

export async function bulkUpdateMessages(ids, updates) {
  return adminFetch(endpoints.bulkStatus, { method: 'PATCH', json: { ids, status: updates.status } });
}

export async function deleteMessage(id) {
  await adminFetch(endpoints.message(id), { method: 'DELETE' });
  return true;
}

export async function bulkDeleteMessages(ids) {
  await adminFetch(endpoints.bulkDelete, { method: 'DELETE', json: { ids } });
  return true;
}

export async function saveNotes(id, notes) {
  return adminFetch(endpoints.messageNotes(id), { method: 'PATCH', json: { notes } });
}

function replyFormData({ to, subject, cc, bcc, body, files }) {
  const form = new FormData();
  form.set('to', to || '');
  form.set('subject', subject || '');
  form.set('body', body || '');
  form.set('cc', cc || '');
  form.set('bcc', bcc || '');
  (files || []).forEach((file) => form.append('files', file));
  return form;
}

/** Sends the reply email (backend currently logs instead of delivering it -
 * see backend_fastapi/app/email_service.py - and marks the message replied. */
export async function sendReply(id, payload) {
  return adminFetch(endpoints.messageReply(id), { method: 'POST', form: replyFormData(payload) });
}

export async function saveDraft(id, payload) {
  return adminFetch(endpoints.messageDraft(id), { method: 'POST', form: replyFormData(payload) });
}

export async function getMessageStats() {
  return adminFetch(endpoints.messageStats);
}
