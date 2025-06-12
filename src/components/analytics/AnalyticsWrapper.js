'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { trackEssentialPageView } from '@/utils/analytics/tracking'

function AnalyticsCore({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = pathname
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      
      trackEssentialPageView(url)
    }
  }, [pathname, searchParams])

  return children
}

export default function AnalyticsWrapper({ children }) {
  return (
    <Suspense fallback={<div>{children}</div>}>
      <AnalyticsCore>{children}</AnalyticsCore>
    </Suspense>
  )
}