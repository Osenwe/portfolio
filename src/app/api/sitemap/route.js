// app/api/sitemap/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  // Your website URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  // Current date in ISO format
  const date = new Date().toISOString().split('T')[0];
  
  // Define your routes - add all your important URLs
  const routes = [
    { url: '/', lastmod: date, changefreq: 'monthly', priority: 1.0 },
    { url: '/#about', lastmod: date, changefreq: 'monthly', priority: 0.8 },
    { url: '/#services', lastmod: date, changefreq: 'monthly', priority: 0.8 },
    { url: '/#work', lastmod: date, changefreq: 'monthly', priority: 0.9 },
    { url: '/#research', lastmod: date, changefreq: 'monthly', priority: 0.8 },
    { url: '/#contact', lastmod: date, changefreq: 'monthly', priority: 0.7 },
    { url: '/privacy', lastmod: date, changefreq: 'yearly', priority: 0.3 },
    { url: '/settings', lastmod: date, changefreq: 'yearly', priority: 0.2 },
  ];
  
  // later dynamically add project pages here by pulling from the data source
  // e.g., workData.map(project => ({ url: `/projects/${project.slug}`, lastmod: date, changefreq: 'monthly', priority: 0.7 }))
  
  // Generate the XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`;

  // Return the XML with proper content type
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}