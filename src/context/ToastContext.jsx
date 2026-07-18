'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const STYLES = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
  info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
};

const ICON_STYLES = {
  success: 'text-emerald-500 dark:text-emerald-400',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-blue-500 dark:text-blue-400',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    const timer = setTimeout(() => dismissToast(id), duration);
    timers.current.set(id, timer);
    return id;
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      >
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          return (
            <div
              key={toast.id}
              role="status"
              className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm animate-[toast-in_0.2s_ease-out] ${STYLES[toast.type] || STYLES.info}`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${ICON_STYLES[toast.type] || ICON_STYLES.info}`} aria-hidden="true" />
              <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 rounded-md p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
