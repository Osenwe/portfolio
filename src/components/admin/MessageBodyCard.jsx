'use client';

/** Renders the full message body with preserved paragraph breaks and generous, readable typography. */
export default function MessageBodyCard({ message }) {
  const paragraphs = (message || '').split('\n\n');

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-darkHover/30 sm:p-8">
      <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-gray-700 dark:text-gray-200">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
