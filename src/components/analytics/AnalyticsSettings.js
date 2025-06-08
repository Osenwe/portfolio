'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAnalyticsConsent, setAnalyticsConsent, clearAllCookies } from '@/utils/cookies'

export default function AnalyticsSettings() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Load current settings on component mount
  useEffect(() => {
    const cookieConsent = getAnalyticsConsent()
    setAnalyticsEnabled(cookieConsent)
  }, [])

  const handleToggleAnalytics = () => {
    setAnalyticsEnabled(!analyticsEnabled)
    setIsSaved(false)
  }

  const handleSaveSettings = () => {
    setAnalyticsConsent(analyticsEnabled)
    setIsSaved(true)
    
    // If analytics was enabled, reload the page to initialize Google Analytics
    if (analyticsEnabled) {
      window.location.reload()
    }
    
    // Reset the saved message after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const handleClearCookies = () => {
    clearAllCookies()
    setAnalyticsEnabled(false)
    setIsSaved(true)
    
    // Reset the saved message after 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
      
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={analyticsEnabled}
              onChange={handleToggleAnalytics}
            />
            <div className={`w-10 h-6 rounded-full transition ${
              analyticsEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
              analyticsEnabled ? 'translate-x-4' : ''
            }`}></div>
          </div>
          <span className="ml-3 text-gray-700">
            Enable Analytics
          </span>
        </label>
        <p className="text-sm text-gray-500 mt-2">
          {analyticsEnabled 
            ? "Analytics helps me understand how visitors use this portfolio, allowing me to make improvements."
            : "Analytics is currently disabled. No data about your visit is being collected."}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Save Preferences
        </button>
        
        <button
          onClick={handleClearCookies}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
        >
          Clear All Cookies
        </button>
        
        {isSaved && (
          <span className="ml-4 text-green-600 text-sm">
            Your preferences have been saved!
          </span>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          For more information about how I handle your data, please see my{' '}
          <Link 
            href="/privacy" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  )
}