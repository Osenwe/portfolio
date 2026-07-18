'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ADMIN_API_CONFIG } from '@/config/adminApi';
import { adminFetch, AdminApiError } from '@/utils/adminFetch';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const me = await adminFetch(ADMIN_API_CONFIG.endpoints.me);
      setUser(me);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    loadUser().finally(() => setIsLoading(false));
  }, [loadUser]);

  const login = useCallback(async (email, password) => {
    // Throws AdminApiError on failure - the login page reads .message / .status
    // (423 = locked out) to show the right message.
    const me = await adminFetch(ADMIN_API_CONFIG.endpoints.login, { method: 'POST', json: { email, password } });
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminFetch(ADMIN_API_CONFIG.endpoints.logout, { method: 'POST' });
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ user, isLoading, login, logout, refreshUser: loadUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export { AdminApiError };
