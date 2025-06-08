'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import ConsentBanner from './ConsentBanner'
import { initializeEssentialAnalytics, trackEssentialPageView } from '@/utils/analytics/tracking'
import { getAnalyticsConsent, setAnalyticsConsent } from '@/utils/cookies'

// Your Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export default function AnalyticsProvider() {
  const [consent, setConsent] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Check for existing consent on mount
  useEffect(() => {
    const cookieConsent = getAnalyticsConsent()
    if (cookieConsent) {
      setConsent(true)
    } else {
      // Only show banner if consent hasn't been decided yet
      setBannerVisible(true)
    }
    
    // Initialize essential analytics for all visitors
    initializeEssentialAnalytics();
    
    // Track initial page view with essential tracking
    const initialPath = pathname || window.location.pathname;
    trackEssentialPageView(initialPath);
  }, []);

  // Track page views when route changes for all visitors
  useEffect(() => {
    if (pathname) {
      let url = pathname
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      
      // Basic page tracking for all visitors
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

  return (
    <>
      {/* Always load basic GA script for essential tracking */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Load enhanced GA script if consent is given */}
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
      
      {/* Consent Banner Component */}
      {bannerVisible && (
        <ConsentBanner 
          onAccept={handleAccept} 
          onDecline={handleDecline} 
        />
      )}
    </>
  )
}