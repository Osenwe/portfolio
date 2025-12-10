'use client'

import { useState, useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import ConsentBanner from './ConsentBanner'
import { initializeEssentialAnalytics, trackEssentialPageView } from '@/utils/analytics/tracking'
import { getAnalyticsConsent, setAnalyticsConsent } from '@/utils/cookies'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

function AnalyticsCore() {
  // I have set the consent to 
  const [consent, setConsent] = useState(true)
  const [bannerVisible, setBannerVisible] = useState(true)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Check for existing consent on mount
  useEffect(() => {
    const cookieConsent = getAnalyticsConsent()
    if (cookieConsent) {
      setConsent(true)
    } else {
      setBannerVisible(true)
    }
    
    initializeEssentialAnalytics();
    
    const initialPath = pathname || window.location.pathname;
    trackEssentialPageView(initialPath);
  }, [pathname]);

  // Track page views when route changes
  useEffect(() => {
    if (pathname) {
      let url = pathname
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      
      trackEssentialPageView(url);
    }
  }, [pathname, searchParams]);

  const handleAccept = () => {
    setConsent(true)
    setBannerVisible(false)
    setAnalyticsConsent(true)
  }

  const handleDecline = () => {
    setConsent(false)
    setBannerVisible(false)
    setAnalyticsConsent(false)
  }

   const handleClose = () => {
    setConsent(false)
    setBannerVisible(false)
    setAnalyticsConsent(false)
  }


  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {consent && (
        <Script
          id="google-analytics-enhanced"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: '${pathname}',
              });
            `,
          }}
        />
      )}
      
      {bannerVisible && (
        <ConsentBanner 
          onAccept={handleAccept} 
          onDecline={handleDecline} 
          onClose={handleClose}
        />
      )}
    </>
  )
}

export default function AnalyticsProvider() {
  return (
    <Suspense fallback={<div />}>
      <AnalyticsCore />
    </Suspense>
  )
}