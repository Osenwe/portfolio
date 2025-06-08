'use client';

import React, { useEffect } from 'react';
import GameHub from '@/components/games/GameHub';
import PageTransitions from '@/components/animations/PageTransitions';
import FloatingObjects from '@/components/animations/FloatingObjects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gameEvents } from '@/utils/analytics/tracking';

const NotFound = () => {
  // Track when user lands on 404 page
  useEffect(() => {
    try {
      // Track that user reached the 404 page
      gameEvents.view404Page();
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Animated background objects */}
      <FloatingObjects />
      
      <PageTransitions>
        <div className="text-center mb-8">
          <motion.h1 
            className="text-7xl font-bold text-blue-600 mb-2"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 0.5, 0, -0.5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            404
          </motion.h1>
          
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
            Oops! The page you're looking for doesn't exist. But don't worry, you can still have some fun while you're here!
          </p>
          
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
            onClick={() => {
              // Track when user clicks to return home from 404 page
              try {
                gameEvents.selectGame('return_home_from_404');
              } catch (error) {
                console.log('Analytics error (non-critical):', error);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return to Homepage
          </Link>
        </div>
        
        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <GameHub />
          </motion.div>
        </div>
      </PageTransitions>
    </main>
  );
};

export default NotFound;