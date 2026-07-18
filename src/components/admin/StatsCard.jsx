'use client';

/** Single summary metric card used on the dashboard home page. */
export default function StatsCard({ icon: Icon, title, count, description, accent = 'blue' }) {
  const accents = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    slate: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-darkHover/30">
      <div className="flex items-center justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent] || accents.blue}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="text-3xl font-semibold tabular-nums text-gray-900 dark:text-white">{count}</span>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">{title}</p>
      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
