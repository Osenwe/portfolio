'use client';

import { useEffect, useState } from 'react';
import { KeyRound, Bell, PenLine, Mail, Tags, ShieldAlert, Server, Users, Trash2, UserPlus } from 'lucide-react';
import { MESSAGE_CATEGORIES } from '@/data/messageCategories';
import { useToast } from '@/context/ToastContext';
import { useSetAdminPageHeader } from '@/context/AdminPageHeaderContext';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { ADMIN_API_CONFIG } from '@/config/adminApi';
import { adminFetch, AdminApiError } from '@/utils/adminFetch';
import ConfirmDialog from './ConfirmDialog';

const DEFAULT_SIGNATURE = `Best regards,

Andrew Benyeogor
Computer Science Teacher | Information Systems
benyeogorosenwe.com`;

function SettingsSection({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkHover/30 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-2">
      <span>
        <span className="block text-sm font-medium text-gray-800 dark:text-gray-100">{label}</span>
        {description && <span className="block text-xs text-gray-500 dark:text-gray-400">{description}</span>}
      </span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-blue-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500 dark:bg-white/15" />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-white/15 dark:bg-darkHover/40 dark:text-white';
const buttonClass =
  'rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100';

function ChangePasswordSection() {
  const { user } = useAdminAuth();
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    setIsSaving(true);
    try {
      await adminFetch(ADMIN_API_CONFIG.endpoints.changePassword, {
        method: 'POST',
        json: { current_password: currentPassword, new_password: newPassword },
      });
      showToast('Password updated', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSection icon={KeyRound} title="Password" description={`Signed in as ${user?.email || ''}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="current-password" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Current password
          </label>
          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            required
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="new-password" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={10}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">At least 10 characters, with a letter and a number.</p>
        <button type="submit" disabled={isSaving} className={buttonClass}>
          {isSaving ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </SettingsSection>
  );
}

function UsersSection() {
  const { user: currentUser } = useAdminAuth();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState({ email: '', password: '', is_owner: false });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadUsers = async () => {
    try {
      const list = await adminFetch(ADMIN_API_CONFIG.endpoints.users);
      setUsers(list);
    } catch {
      showToast('Failed to load users', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setCreateError('');
    setIsCreating(true);
    try {
      await adminFetch(ADMIN_API_CONFIG.endpoints.users, { method: 'POST', json: newUser });
      showToast('User added', 'success');
      setNewUser({ email: '', password: '', is_owner: false });
      await loadUsers();
    } catch (err) {
      setCreateError(err instanceof AdminApiError ? err.message : 'Failed to add user');
    } finally {
      setIsCreating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await adminFetch(ADMIN_API_CONFIG.endpoints.user(deleteTarget.id), { method: 'DELETE' });
      showToast('User removed', 'success');
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    } catch (err) {
      showToast(err instanceof AdminApiError ? err.message : 'Failed to remove user', 'error');
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <SettingsSection icon={Users} title="Team" description="Only owners can add or remove dashboard users.">
      {isLoading ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">Loading…</p>
      ) : (
        <ul className="divide-y divide-gray-100 dark:divide-white/10">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-100">{u.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{u.isOwner ? 'Owner' : 'Admin'}</p>
              </div>
              <button
                type="button"
                onClick={() => setDeleteTarget(u)}
                disabled={u.id === currentUser?.id}
                title={u.id === currentUser?.id ? "You can't remove your own account" : 'Remove user'}
                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-400 dark:hover:bg-red-950/40"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCreate} className="mt-4 space-y-3 border-t border-gray-100 pt-4 dark:border-white/10">
        {createError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {createError}
          </p>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="email"
            required
            placeholder="Email"
            value={newUser.email}
            onChange={(event) => setNewUser((prev) => ({ ...prev, email: event.target.value }))}
            className={inputClass}
          />
          <input
            type="password"
            required
            minLength={10}
            placeholder="Password (min 10 characters)"
            value={newUser.password}
            onChange={(event) => setNewUser((prev) => ({ ...prev, password: event.target.value }))}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={newUser.is_owner}
            onChange={(event) => setNewUser((prev) => ({ ...prev, is_owner: event.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 dark:border-white/30"
          />
          Grant owner access (can manage other users)
        </label>
        <button type="submit" disabled={isCreating} className={`${buttonClass} flex items-center gap-1.5`}>
          <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
          {isCreating ? 'Adding…' : 'Add User'}
        </button>
      </form>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove this user?"
        description={deleteTarget ? `${deleteTarget.email} will immediately lose access to the dashboard.` : ''}
        confirmLabel="Remove"
        tone="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </SettingsSection>
  );
}

export default function SettingsPageClient() {
  useSetAdminPageHeader('Settings', 'Manage your admin dashboard preferences.');

  const { user } = useAdminAuth();
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState({ emailOnNewMessage: true, browserPush: false });
  const [signature, setSignature] = useState(DEFAULT_SIGNATURE);
  const [defaultReplyEmail, setDefaultReplyEmail] = useState('benyeogorosenwe@gmail.com');
  const [autoSpam, setAutoSpam] = useState(true);

  // These four settings have no backend endpoint yet (there's genuinely
  // nowhere to persist them) - kept as local-only placeholders, unlike
  // Password/Team above which are fully wired up.
  const handleSave = (label) => (event) => {
    event?.preventDefault?.();
    showToast(`${label} saved (stored locally for now - no backend endpoint yet)`, 'success');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <ChangePasswordSection />

      {user?.isOwner && <UsersSection />}

      <SettingsSection icon={Bell} title="Notifications" description="Choose how you're alerted about new messages.">
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          <ToggleRow
            label="Email me on new messages"
            description="Get an email whenever someone submits the contact form."
            checked={notifications.emailOnNewMessage}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, emailOnNewMessage: checked }))}
          />
          <ToggleRow
            label="Browser push notifications"
            description="Coming soon - requires backend push support."
            checked={notifications.browserPush}
            onChange={(checked) => setNotifications((prev) => ({ ...prev, browserPush: checked }))}
          />
        </div>
        <button type="button" onClick={handleSave('Notification preferences')} className={`mt-3 ${buttonClass}`}>
          Save Notifications
        </button>
      </SettingsSection>

      <SettingsSection icon={PenLine} title="Reply Signature" description="Appended to replies sent from the Messages page.">
        <textarea
          rows={5}
          value={signature}
          onChange={(event) => setSignature(event.target.value)}
          className={`resize-y ${inputClass}`}
        />
        <button type="button" onClick={handleSave('Reply signature')} className={`mt-3 ${buttonClass}`}>
          Save Signature
        </button>
      </SettingsSection>

      <SettingsSection icon={Mail} title="Default Reply Email" description="The “From” address used when replying to messages.">
        <input
          type="email"
          value={defaultReplyEmail}
          onChange={(event) => setDefaultReplyEmail(event.target.value)}
          className={`max-w-sm ${inputClass}`}
        />
        <button type="button" onClick={handleSave('Default reply email')} className={`mt-3 block ${buttonClass}`}>
          Save Email
        </button>
      </SettingsSection>

      <SettingsSection icon={Tags} title="Categories" description="Used to tag and filter incoming messages.">
        <ul className="flex flex-wrap gap-2">
          {MESSAGE_CATEGORIES.map((category) => (
            <li key={category.value} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300">
              {category.label}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Categories are defined in <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10">src/data/messageCategories.js</code> on
          the frontend and <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10">backend_fastapi/app/schemas.py</code> on the
          backend - there's no dynamic categories endpoint yet, so editing them means updating both files.
        </p>
      </SettingsSection>

      <SettingsSection icon={ShieldAlert} title="Spam Settings" description="Frontend placeholder - real filtering needs more backend work.">
        <ToggleRow
          label="Auto-flag suspicious messages"
          description="Heuristic spam detection isn't implemented yet - Spam is currently a manual status you set per-message."
          checked={autoSpam}
          onChange={setAutoSpam}
        />
        <button type="button" onClick={handleSave('Spam settings')} className={`mt-3 ${buttonClass}`}>
          Save Spam Settings
        </button>
      </SettingsSection>

      <SettingsSection icon={Server} title="Backend Status" description="Where message data is coming from right now.">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Connected to FastAPI backend</span>
        </div>
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          Messages, notes, and replies are read from and written to the real database via{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10">src/services/messagesService.js</code>. Email
          sending itself is still a stub (logs instead of delivering) - see{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10">backend_fastapi/app/email_service.py</code>.
        </p>
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          API base URL: <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10">{ADMIN_API_CONFIG.baseUrl || 'Not set'}</code>
        </p>
      </SettingsSection>
    </div>
  );
}
