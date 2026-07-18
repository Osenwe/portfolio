import { ADMIN_API_CONFIG } from '@/config/adminApi';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';

function getCsrfToken() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export class AdminApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

/**
 * fetch() wrapper for the FastAPI backend: always sends cookies, always
 * attaches the CSRF header on mutating requests (see the double-submit
 * cookie pattern in backend_fastapi/app/security.py), and throws
 * AdminApiError with the parsed error body on non-2xx responses.
 */
export async function adminFetch(path, { method = 'GET', json, form, ...rest } = {}) {
  const headers = { ...(rest.headers || {}) };
  if (json !== undefined) headers['Content-Type'] = 'application/json';

  if (method !== 'GET') {
    const csrfToken = getCsrfToken();
    if (csrfToken) headers[CSRF_HEADER_NAME] = csrfToken;
  }

  const response = await fetch(`${ADMIN_API_CONFIG.baseUrl}${path}`, {
    ...rest,
    method,
    credentials: 'include',
    headers,
    body: form !== undefined ? form : json !== undefined ? JSON.stringify(json) : undefined,
  });

  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = payload?.detail || payload?.message || `Request failed (${response.status})`;
    throw new AdminApiError(message, response.status, payload);
  }

  return payload;
}
