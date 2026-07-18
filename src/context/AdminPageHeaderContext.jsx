'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Lets individual /admin pages (dashboard, messages, message detail,
// settings) describe their own header title/description without prop
// drilling it down through the shared admin layout - useful because the
// message detail page wants the header to show the actual subject line.
const AdminPageHeaderContext = createContext(null);

export function AdminPageHeaderProvider({ children }) {
  const [header, setHeader] = useState({ title: 'Admin Dashboard', description: '' });

  // Without this, `value` is a brand-new object every render, so every
  // consumer (including useSetAdminPageHeader's own effect below) sees a
  // "changed" context on every render - which re-runs the effect, which
  // calls setHeader, which re-renders the provider, forever.
  const value = useMemo(() => ({ header, setHeader }), [header]);

  return <AdminPageHeaderContext.Provider value={value}>{children}</AdminPageHeaderContext.Provider>;
}

/** Call from a page component to set the header title/description it wants shown. */
export function useSetAdminPageHeader(title, description = '') {
  const context = useContext(AdminPageHeaderContext);
  const setHeader = context?.setHeader;

  useEffect(() => {
    // Depend on the stable setHeader function (from useState) and the
    // primitive title/description, not the whole context object - object
    // identity there would still change every render otherwise.
    setHeader?.({ title, description });
  }, [setHeader, title, description]);
}

/** Used internally by AdminLayoutClient to read the currently-set header. */
export function useAdminPageHeader() {
  const context = useContext(AdminPageHeaderContext);
  if (!context) {
    throw new Error('useAdminPageHeader must be used within an AdminPageHeaderProvider');
  }
  return context.header;
}
