// src/config/adminApi.js
//
// Single source of truth for the FastAPI backend's base URL + route paths.
// Set NEXT_PUBLIC_API_URL (see .env.development) to wherever the backend
// is running - http://localhost:8000 locally, or the deployed Vercel URL
// once backend_fastapi is live.
export const ADMIN_API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  endpoints: {
    login: '/api/admin/auth/login',
    logout: '/api/admin/auth/logout',
    me: '/api/admin/auth/me',
    refresh: '/api/admin/auth/refresh',
    changePassword: '/api/admin/auth/change-password',

    users: '/api/admin/users',
    user: (id) => `/api/admin/users/${id}`,

    messages: '/api/admin/messages',
    messageStats: '/api/admin/messages/stats',
    message: (id) => `/api/admin/messages/${id}`,
    messageStatus: (id) => `/api/admin/messages/${id}/status`,
    messageNotes: (id) => `/api/admin/messages/${id}/notes`,
    messageReply: (id) => `/api/admin/messages/${id}/reply`,
    messageDraft: (id) => `/api/admin/messages/${id}/draft`,
    bulkStatus: '/api/admin/messages/bulk/status',
    bulkDelete: '/api/admin/messages/bulk',
  },
};
