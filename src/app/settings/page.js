'use client';

import { useSelector } from 'react-redux'
import AnalyticsSettings from '@/components/analytics/AnalyticsSettings'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function SettingsPage() {
  // Get theme state from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  return (
    <>
      <Navbar />
      <main className={`min-h-screen pt-20 ${
        isDarkMode 
          ? 'bg-gray-900' 
          : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Privacy Settings
          </h1>
          
          <div className={`rounded-xl shadow-sm p-8 mb-8 ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white'
          }`}>
            <div className="mb-8">
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Here you can manage your privacy preferences for this portfolio website.
                Your choices will be saved and respected during your visits.
              </p>
            </div>
            
            {/* Privacy Settings Information */}
            <div className={`p-6 rounded-lg mb-8 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 flex items-center ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <svg className={`w-6 h-6 mr-3 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Your Privacy Control
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="flex items-center mb-2">
                    <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Always Active</span>
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Essential site functionality and basic page analytics (anonymized)
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="flex items-center mb-2">
                    <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Your Choice</span>
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Enhanced analytics to improve your experience (configurable below)
                  </p>
                </div>
              </div>
            </div>
            
            {/* Analytics Settings Component */}
            <AnalyticsSettings isDarkMode={isDarkMode} />
            
            {/* Additional Information */}
            <div className={`mt-8 p-6 rounded-lg border-l-4 ${
              isDarkMode 
                ? 'bg-blue-900/20 border-blue-400' 
                : 'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex items-start">
                <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
                <div>
                  <h3 className={`font-medium mb-2 ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-800'
                  }`}>
                    About Your Privacy
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}>
                    Your privacy settings are stored locally in your browser and are not linked to any personal information. 
                    You can change these settings at any time. For more details, see our{' '}
                    <Link href="/privacy" className={`underline font-medium ${
                      isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-800 hover:text-blue-900'
                    }`}>
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/"
              className={`inline-flex items-center font-medium px-4 py-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30' 
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Homepage
            </Link>
            
            <Link 
              href="/privacy"
              className={`inline-flex items-center font-medium px-4 py-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  )
}