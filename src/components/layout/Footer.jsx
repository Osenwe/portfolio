import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { portfolioEvents, gameEvents} from '@/utils/analytics/tracking'

const Footer = ({isDarkMode}) => {
  // Function to handle social media clicks
  const handleSocialClick = (platform) => {
    // This will only track detailed interactions if the user gave consent
    portfolioEvents.clickSocialMedia(platform);
  };

  // Function to handle games page click
  const handleGamesClick = () => {
    try {
      gameEvents.selectGame('footer_games_link');
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };

  // Function to handle resources page click
  const handleResourcesClick = () => {
    try {
      portfolioEvents.clickInternalLink('footer_resources_link');
    } catch (error) {
      console.log('Analytics error (non-critical):', error);
    }
  };
  
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image src={isDarkMode ? assets.logo_dark : assets.logo} alt='' className='w-36 mx-auto mb-2'/>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='' className='w-6'/>
            <span className='text-sm sm:text-base'>benyeogorosenwe@gmail.com</span>
        </div>
      </div>

      <div className='text-center flex flex-col sm:flex-row items-center justify-between border-t border-gray-400 mx-[5%] sm:mx-[10%] mt-12 py-6 gap-6'>
        <p className='text-sm sm:text-base order-last sm:order-first'>© Osenwe Benyeogor.</p>
        
        <div className='flex flex-col items-center gap-6 justify-center w-full sm:w-auto'>
          {/* Internal Pages Links */}
          <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto'>
            {/* Special Games Link with Enhanced Design - Mobile Optimized */}
            <Link 
              href="/games" 
              onClick={handleGamesClick}
              className='group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none'
            >
              {/* Game Controller Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 sm:h-4 sm:w-4 group-hover:animate-pulse flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V8a3 3 0 00-3-3H8a3 3 0 00-3 3v2m0 0v6a3 3 0 003 3h2a3 3 0 003-3v-6m0 0h6"
                />
              </svg>
              
              <span className='relative text-base sm:text-sm'>
                Games
                {/* Sparkle effect - hidden on very small screens */}
                <span className='hidden sm:block absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75'></span>
              </span>
              
              {/* Hover gradient overlay */}
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12'></div>
            </Link>

            {/* Resources Link with Enhanced Design - Mobile Optimized */}
            <Link 
              href="/resources" 
              onClick={handleResourcesClick}
              className='group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none'
            >
              {/* Resources Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 sm:h-4 sm:w-4 group-hover:animate-pulse flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.247 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              
              <span className='relative text-base sm:text-sm'>
                Resources
                {/* Sparkle effect - hidden on very small screens */}
                <span className='hidden sm:block absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75'></span>
              </span>
              
              {/* Hover gradient overlay */}
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12'></div>
            </Link>
            
            {/* Regular Internal Links - Mobile Optimized */}
            <div className='flex items-center gap-6 sm:gap-6'>
              <Link 
                href="/#work" 
                className='relative group hover:text-blue-600 transition-all duration-200 font-medium text-base sm:text-sm'
              >
                <span className='relative z-10'>Projects</span>
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
              </Link>
              
              <Link 
                href="/#about" 
                className='relative group hover:text-blue-600 transition-all duration-200 font-medium text-base sm:text-sm'
              >
                <span className='relative z-10'>About</span>
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
              </Link>
            </div>
          </div>

          {/* Divider - Horizontal on mobile, vertical on desktop */}
          <div className='w-full h-px sm:w-px sm:h-6 bg-gray-400 sm:hidden'></div>
          <div className='hidden sm:block w-px h-6 bg-gray-400'></div>

          {/* Social Media Links - Mobile Grid Layout */}
          <div className='w-full sm:w-auto'>
            <ul className='grid grid-cols-2 sm:flex gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-none mx-auto'>
              <li className='w-full sm:w-auto'>
                <a  
                  target='_blank' 
                  href="https://github.com/Osenwe"  
                  onClick={() => handleSocialClick('GitHub')}
                  className='group relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm'
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className='truncate'>GitHub</span>
                </a>
              </li>

              <li className='w-full sm:w-auto'>
                <a  
                  target='_blank' 
                  href="https://www.linkedin.com/in/andrewbenyeogor"  
                  onClick={() => handleSocialClick('LinkedIn')}
                  className='group relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm'
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className='truncate'>LinkedIn</span>
                </a>
              </li>

              <li className='w-full sm:w-auto'>
                <a  
                  target='_blank' 
                  href="https://public.tableau.com/app/profile/benyeogorosenwe/vizzes"  
                  onClick={() => handleSocialClick('Tableau')}
                  className='group relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm'
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.654 1.462c0-.659-.537-1.196-1.196-1.196h-1.347c-.659 0-1.196.537-1.196 1.196v2.078c0 .659.537 1.196 1.196 1.196h1.347c.659 0 1.196-.537 1.196-1.196V1.462zm8.767 8.767c0-.659-.537-1.196-1.196-1.196h-2.078c-.659 0-1.196.537-1.196 1.196v1.347c0 .659.537 1.196 1.196 1.196h2.078c.659 0 1.196-.537 1.196-1.196v-1.347zm-8.767 8.767c0-.659-.537-1.196-1.196-1.196h-1.347c-.659 0-1.196.537-1.196 1.196v2.078c0 .659.537 1.196 1.196 1.196h1.347c.659 0 1.196-.537 1.196-1.196v-2.078zM3.654 10.229c0-.659-.537-1.196-1.196-1.196H1.111c-.659 0-1.196.537-1.196 1.196v1.347c0 .659.537 1.196 1.196 1.196h1.347c.659 0 1.196-.537 1.196-1.196v-1.347z"/>
                  </svg>
                  <span className='truncate'>Tableau</span>
                </a>
              </li>

              <li className='w-full sm:w-auto'>
                <a  
                  target='_blank' 
                  href="https://scholar.google.com/citations?hl=en&user=29GRRkoAAAAJ"  
                  onClick={() => handleSocialClick('Google Scholar')}
                  className='group relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm'
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                  <span className='truncate'>Scholar</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer