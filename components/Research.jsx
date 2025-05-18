import React, { useEffect, useState } from 'react'
import { assets, researchPapers } from '@/assets/assets'
import Image from 'next/image'
import { motion } from "framer-motion"
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ResearchPapers = () => {
  const [slidesPerView, setSlidesPerView] = useState(3)
  
  // Responsive slides handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }
    
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div 
    initial={{ opacity: 0 }} 
    whileInView={{ opacity: 1 }} 
    transition={{ duration: 1 }}
    id="research" className='w-full px-6 md:px-[10%] py-16 scroll-mt-20'>

      <motion.h4 
      initial={{ y: -20, opacity: 0 }} 
      whileInView={{ y: 0, opacity: 1 }} 
      transition={{ delay: 0.3, duration: 0.5 }}
      className='text-center mb-2 text-lg font-Ovo'>
      Academic Contributions</motion.h4>

      <motion.h2 
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className='text-center text-5xl font-Ovo'>
      Research Papers</motion.h2>

      <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        Published works showcasing my contributions to the field of information systems.</motion.p>

      <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className='my-10 relative'>
        {/* Custom styles for equal height slides */}
        <style jsx global>{`
          .research-carousel .swiper-wrapper {
            display: flex;
            align-items: stretch;
          }
          .research-carousel .swiper-slide {
            height: auto;
            display: flex;
          }
          .research-carousel .swiper-slide > div {
            height: 100%;
            width: 100%;
          }
        `}</style>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ 
            delay: 5000,
            disableOnInteraction: false
          }}
          className='research-carousel !pb-12'
        >
          {researchPapers.map((paper, index) => (
            <SwiperSlide key={index}>
              <motion.div 
              whileHover={{scale: 1.03}}
              className='border border-gray-400 rounded-lg overflow-hidden flex flex-col w-full hover:shadow-lg cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white'>
                <div className='p-6 flex-grow'>
                  <div className='flex items-start gap-4 mb-4'>
                    <Image src={paper.thumbnail} alt='' className='w-10 mt-1 flex-shrink-0' />
                    <div>
                      <p className='text-sm text-gray-500 dark:text-gray-300'>{paper.journal} • {paper.year}</p>
                      <h3 className='text-lg font-medium text-gray-800 dark:text-white mt-1'>{paper.title}</h3>
                    </div>
                  </div>
                  
                  {/* Fixed height for abstract with text truncation */}
                  <div className='h-24 overflow-hidden'>
                    <p className='text-sm text-gray-600 leading-relaxed mt-3 dark:text-white/80'>
                      {paper.abstract}
                    </p>
                  </div>
                  
                  <div className='text-xs text-gray-500 mt-4 dark:text-gray-300'>
                    DOI: {paper.doi}
                  </div>
                </div>
                
                <div className='mt-auto border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50'>
                  <Link href={paper.pdfLink} className='flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
                    View full paper <Image alt='View paper' src={assets.right_arrow} className='w-4' />
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

    </motion.div>
  )
}

export default ResearchPapers