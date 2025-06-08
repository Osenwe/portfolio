'use client';

import Link from 'next/link'
import { useSelector } from 'react-redux'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PrivacyPolicy() {
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
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className={`text-4xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Privacy Policy
          </h1>
          
          <div className={`rounded-xl shadow-sm p-8 mb-8 ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white'
          }`}>
            <p className={`text-lg mb-8 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              This Privacy Policy explains how I collect, use, and protect your information when you visit 
              my portfolio website. I respect your privacy and am committed to protecting your personal data.
            </p>
            
            {/* Cookie Management Section */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${
                isDarkMode 
                  ? 'text-white border-gray-600' 
                  : 'text-gray-800 border-gray-200'
              }`}>
                Managing Your Privacy
              </h2>
              
              <h3 className={`text-xl font-semibold mt-6 mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Cookie Preferences
              </h3>
              
              <div className={`p-6 rounded-lg mb-6 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  You can control your cookie preferences using any of these methods:
                </p>
                
                <ul className={`space-y-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li className="flex items-start">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0 mt-0.5 ${
                      isDarkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>1</span>
                    <span>Accept or decline cookies via the consent banner when you first visit</span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0 mt-0.5 ${
                      isDarkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>2</span>
                    <span>
                      Visit the <Link href="/settings" className={`font-medium hover:underline ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>Privacy Settings</Link> page to update your preferences at any time
                    </span>
                  </li>
                  
                  <li className="flex items-start">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0 mt-0.5 ${
                      isDarkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>3</span>
                    <span>Configure your browser settings to manage or refuse cookies</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Information Collection Section */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 pb-2 border-b ${
                isDarkMode 
                  ? 'text-white border-gray-600' 
                  : 'text-gray-800 border-gray-200'
              }`}>
                Information I Collect
              </h2>
              
              <p className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                When you visit my portfolio website, I may collect the following information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    Essential Analytics
                    <span className={`ml-2 text-sm font-normal ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>(No consent required)</span>
                  </h3>
                  
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Basic page visit data (anonymized)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Referral source (how you found my site)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      General location data (country level only)
                    </li>
                  </ul>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                    Enhanced Analytics
                    <span className={`ml-2 text-sm font-normal ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>(With consent)</span>
                  </h3>
                  
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Which projects you viewed
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      How you interact with site features
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Time spent on different sections
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Navigation patterns across the site
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* How I Use Information Section */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 pb-2 border-b ${
                isDarkMode 
                  ? 'text-white border-gray-600' 
                  : 'text-gray-800 border-gray-200'
              }`}>
                How I Use Your Information
              </h2>
              
              <div className={`p-6 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I use the collected information to:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg shadow-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className={`mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Understand visitor interactions</span>
                    </div>
                    <p className={`text-sm ml-8 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Learning how people engage with my portfolio helps me improve the overall experience.
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg shadow-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className={`mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Identify popular projects</span>
                    </div>
                    <p className={`text-sm ml-8 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Knowing which projects receive the most attention helps me highlight my most relevant work.
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg shadow-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className={`mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Improve user experience</span>
                    </div>
                    <p className={`text-sm ml-8 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Analytics help me enhance navigation and content to create a better portfolio experience.
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg shadow-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className={`mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                        </svg>
                      </span>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Track performance</span>
                    </div>
                    <p className={`text-sm ml-8 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Basic metrics help me understand how well my portfolio is meeting visitors' needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Your Rights Section */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 pb-2 border-b ${
                isDarkMode 
                  ? 'text-white border-gray-600' 
                  : 'text-gray-800 border-gray-200'
              }`}>
                Your Rights
              </h2>
              
              <div className={`p-6 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  As a visitor to my site, you have the right to:
                </p>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <svg className={`h-5 w-5 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>Withdraw consent at any time</p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        You can change your analytics preferences via the settings page whenever you want.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <svg className={`h-5 w-5 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>Request information about collected data</p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        If you'd like to know what data has been collected, you can contact me via the form below.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <svg className={`h-5 w-5 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>Request deletion of your data</p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        You can request that your analytics data be deleted from my records at any time.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Data Security and Third-Party Services */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${
                  isDarkMode 
                    ? 'text-white border-gray-600' 
                    : 'text-gray-800 border-gray-200'
                }`}>
                  Data Security
                </h2>
                
                <div className={`p-6 rounded-lg h-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center mb-4">
                    <div className={`rounded-full p-2 mr-3 ${
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    }`}>
                      <svg className={`w-6 h-6 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>Protection Measures</h3>
                  </div>
                  
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    I implement appropriate security measures to protect your information. Google Analytics
                    data is stored securely according to Google's privacy policies.
                  </p>
                  
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Your data is treated with care and only used for the purposes outlined in this policy.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${
                  isDarkMode 
                    ? 'text-white border-gray-600' 
                    : 'text-gray-800 border-gray-200'
                }`}>
                  Third-Party Services
                </h2>
                
                <div className={`p-6 rounded-lg h-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center mb-4">
                    <div className={`rounded-full p-2 mr-3 ${
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    }`}>
                      <svg className={`w-6 h-6 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>Service Providers</h3>
                  </div>
                  
                  <div className={`flex items-center p-4 rounded-lg shadow-sm mb-3 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Logo" className="h-6 mr-3" />
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Google Analytics</p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>For website usage analytics</p>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    This service is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={`hover:underline ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>Google's Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Updates and Contact */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${
                  isDarkMode 
                    ? 'text-white border-gray-600' 
                    : 'text-gray-800 border-gray-200'
                }`}>
                  Updates to This Policy
                </h2>
                
                <div className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    I may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date.
                  </p>
                  <p className={`text-sm mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Last updated: May 18, 2025
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${
                  isDarkMode 
                    ? 'text-white border-gray-600' 
                    : 'text-gray-800 border-gray-200'
                }`}>
                  Contact Me
                </h2>
                
                <div className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    If you have any questions about this Privacy Policy, please contact me through the contact form on this website.
                  </p>
                  
                  <Link 
                    href="#contact" 
                    className={`inline-flex items-center font-medium py-2 px-4 rounded-md transition-colors ${
                      isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Contact Form
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/"
              className={`inline-flex items-center font-medium ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </>
  )
}