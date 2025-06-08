// app/games/page.js
'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameHub from '@/components/games/GameHub';
import PageTransitions from '@/components/animations/PageTransitions';
import FloatingObjects from '@/components/animations/FloatingObjects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gameEvents } from '@/utils/analytics/tracking';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GamesPage = () => {
  // Get theme state from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Track when user visits the games page
  useEffect(() => {
    try {
      // Track that user reached the dedicated games page
      gameEvents.viewGameHub();
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  }, []);
  

  return (
    <>
    <Navbar />
    <main className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    } pt-20`}>
      {/* Animated background objects */}
      <FloatingObjects />
      
      <div className="container mx-auto px-4 py-12">
        <PageTransitions>
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Game Zone
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
              <p className={`text-xl max-w-2xl mx-auto mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Take a break and enjoy some classic games! Challenge yourself with these 
                interactive experiences built with modern web technologies.
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Link 
                href="/"
                className={`font-medium inline-flex items-center transition-colors px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30' 
                    : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                }`}
                onClick={() => {
                  try {
                    gameEvents.selectGame('return_home_from_games');
                  } catch (error) {
                    console.log('Analytics error (non-critical):', error);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
              <Link 
                href="/projects"
                className={`font-medium inline-flex items-center transition-colors px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-900/30' 
                    : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Projects
              </Link>
              <Link 
                href="/about"
                className={`font-medium inline-flex items-center transition-colors px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'text-green-400 hover:text-green-300 hover:bg-green-900/30' 
                    : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                About
              </Link>
            </motion.div>
          </div>
          
          {/* GameHub Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <GameHub isDarkMode={isDarkMode} />
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className={`backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-3xl mx-auto ${
              isDarkMode 
                ? 'bg-gray-800/80 border border-gray-700' 
                : 'bg-white/80'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Built with Modern Web Technologies
              </h3>
              <p className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                These games are built using React, Next.js, and HTML5 Canvas. 
                They showcase interactive programming, game logic, and responsive design principles.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>React</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Next.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Canvas</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Responsive</span>
                </div>
              </div>
            </div>
          </motion.div>
        </PageTransitions>
      </div>
    </main>
    <Footer isDarkMode={isDarkMode} />
    </>
  );
};

export default GamesPage;