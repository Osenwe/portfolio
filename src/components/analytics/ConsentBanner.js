'use client'

import Link from 'next/link'

export default function ConsentBanner({ onAccept, onDecline }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
                className="text-blue-400 hover:text-blue-300 underline"
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
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            >
              Basic Analytics Only
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Accept Enhanced Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}