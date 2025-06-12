// app/sitemap.js

// Force static generation (required for Next.js 15)
export const dynamic = 'force-static'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

// Define your routes manually
const STATIC_ROUTES = [
  '/',
  '/games',
  '/settings',
  '/settings',
  '/resources',
  'privacy',
  '/ctf/cookie-monster',
  '/ctf/',
  '/ctf/',
  '/ctf/',
  '/ctf/',
  '/ctf/'
  // Add all your actual routes here
]

export default function sitemap() {
  try {
    const staticUrls = STATIC_ROUTES.map(route => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/' ? 'daily' : 'weekly',
      priority: route === '/' ? 1.0 : 0.8,
    }))

    return staticUrls
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      }
    ]
  }
}