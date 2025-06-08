'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { trackEssentialPageView } from '@/utils/analytics/tracking'

export default function AnalyticsWrapper({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views automatically whenever the route changes
  useEffect(() => {
    if (pathname) {
      // Build the full URL with search parameters
      let url = pathname
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      
      // Track page view using essential analytics (works for all visitors)
      trackEssentialPageView(url)
      
      // Track section views based on pathname segments
      // This extracts sections from URLs like /projects, /about, etc.
      const section = pathname.split('/')[1] || 'home'
      
    }
  }, [pathname, searchParams])

  return children
}