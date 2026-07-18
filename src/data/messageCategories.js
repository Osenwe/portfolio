// src/data/messageCategories.js
//
// Shared category list for the admin dashboard's filters/badges. Kept in
// sync by hand with the categories the backend accepts (see
// backend_fastapi/app/schemas.py's MessageCategory literal) - there's no
// dynamic categories endpoint yet (see the note in SettingsPageClient).
export const MESSAGE_CATEGORIES = [
  { value: 'general-inquiry', label: 'General Inquiry' },
  { value: 'research-collaboration', label: 'Research Collaboration' },
  { value: 'speaking-invitation', label: 'Speaking Invitation' },
  { value: 'technical-support', label: 'Technical Support' },
  { value: 'employment', label: 'Employment' },
  { value: 'other', label: 'Other' },
];

export const MESSAGE_STATUSES = ['unread', 'read', 'archived', 'spam'];
export const REPLY_STATUSES = ['replied', 'not-replied'];
