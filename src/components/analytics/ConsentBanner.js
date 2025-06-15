'use client'

import Link from 'next/link'

export default function ConsentBanner({ onAccept, onDecline, onClose }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-4xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-5 w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-label="Close cookie banner"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pr-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-1">Cookie Consent</h3>
            <p className="text-sm text-gray-300 mb-1">
              This site uses basic anonymous analytics to understand page views. If you accept, 
              I'll also be able to collect enhanced analytics on how you interact with my portfolio.
            </p>
            <p className="text-xs text-gray-400">
              See our{' '}
              <Link 
                href="/privacy" 
                className="text-blue-400 hover:text-blue-300 underline focus:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>{' '}
              for details on how your data is used.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Basic Analytics
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              Enhanced Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}