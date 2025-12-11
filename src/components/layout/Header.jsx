import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"
import { portfolioEvents } from '@/utils/analytics/tracking'

// Helper function to check if image source exists
const isValidImage = (src) => src && src !== "";

const Header = () => {
  // Function to track resume downloads
  const handleResumeDownload = () => {
    portfolioEvents.downloadResume();
  };

  // Function to track contact link clicks
  const handleContactClick = () => {
    portfolioEvents.clickProject('Contact Section', 'internal-navigation');
  };
  
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-4 pt-20 pb-12'>
      <motion.div
      initial={{scale: 0}}
      whileInView={{scale: 1}}
      transition={{duration: 0.8, type: 'spring', stiffness: 100}}
      >
        {isValidImage(assets.user_image) ? (
          <Image 
            src={assets.user_image} 
            alt="Andrew Benyeogor profile photo" 
            className='rounded-full w-32'
            priority // Add priority since this is above the fold
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200"></div>
        )}
      </motion.div>
      <motion.h3 
      initial={{y: -20, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.6, delay: 0.3}}
      className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo'>
        Hi! I'm Andrew Benyeogor
        {isValidImage(assets.hand_icon) && (
          <Image 
            src={assets.hand_icon} 
            alt="Waving hand icon" 
            className='w-6'
          />
        )}
      </motion.h3>
      
      <motion.h1 
      initial={{y: -30, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{duration: 0.8, delay: 0.5}}
      className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'>
        Based in Texas.
      </motion.h1>

      <motion.p
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 0.6, delay: 0.7}}
      className='max-w-2xl mx-auto font-Ovo'>
        CTE Education || Data Analytics || Agriculture 
        </motion.p>

      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <motion.a 
        initial={{y: 30, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.6, delay: 1}}
        href="#contact"
        onClick={handleContactClick}
        className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'
        >
          contact me 
          {isValidImage(assets.right_arrow_white) && (
            <Image 
              src={assets.right_arrow_white} 
              alt="Right arrow icon" 
              className='w-4'
            />
          )}
        </motion.a>

        <motion.a 
        initial={{y: 30, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        transition={{duration: 0.6, delay: 1.2}}
        href="/osenwe_resume.pdf" 
        download 
        onClick={handleResumeDownload}
        className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'
        >
          my resume 
          {isValidImage(assets.download_icon) && (
            <Image 
              src={assets.download_icon} 
              alt="Download icon" 
              className='w-4'
            />
          )}
        </motion.a>
      </div>
    </div>
  )
}

export default Header