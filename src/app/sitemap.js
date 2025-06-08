// app/sitemap.js
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { MetadataRoute } from 'next';

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
const APP_DIR = join(process.cwd(), 'app');
const IGNORE_PATHS = [
  '/api', // API routes
  '/sitemap', // The sitemap itself
  '/robots', // Robots file
  '/not-found', // 404 page
  '/error', // Error page
  '/loading', // Loading page
  '/layout', // Layout file
  '/template', // Template file
  '/global-error', // Global error file
];

/**
 * Recursively scan app directory to find all page.js files
 */
function scanAppDirectory(dir, basePath = '') {
  const entries = readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = join(basePath, entry.name);
    
    // Skip hidden files and directories
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) {
      continue;
    }
    
    // Skip files and directories in the ignore list
    if (IGNORE_PATHS.some(path => relativePath.includes(path))) {
      continue;
    }

    if (entry.isDirectory()) {
      // Handle route groups (in parentheses) - these don't affect the URL path
      const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')');
      const isNamedSlot = entry.name.startsWith('@');
      
      // Skip named slots (@something) used for parallel routes
      if (isNamedSlot) {
        continue;
      }
      
      // For route groups, don't add the group name to the path
      const newBasePath = isRouteGroup ? basePath : join(basePath, entry.name);
      
      // Recursively scan subdirectories
      routes = [...routes, ...scanAppDirectory(fullPath, newBasePath)];
    } else if (entry.name === 'page.js' || entry.name === 'page.tsx') {
      // Found a page file - add its route to the list
      routes.push(basePath);
    }
  }

  return routes;
}

/**
 * Process dynamic routes with parameters
 */
function processDynamicRoutes(routes) {
  // For demonstration, we'll handle common parameter patterns
  // In a real app, you'd want to fetch actual data for these parameters
  return routes.map(route => {
    // Transform dynamic routes with parameters if needed
    if (route.includes('[') && route.includes(']')) {
      // Example: transform /blog/[slug] to actual URLs based on your data
      if (route.includes('blog/[slug]')) {
        // This would usually come from a database or API
        const slugs = ['post-1', 'post-2', 'post-3'];
        return slugs.map(slug => route.replace('[slug]', slug));
      }
      
      // For catch-all routes like /docs/[...slug]
      if (route.includes('[...')) {
        // For demo purposes, we'll skip these or provide examples
        return [];
      }
      
      // For optional catch-all routes like /docs/[[...slug]]
      if (route.includes('[[...')) {
        // Include the base route and some examples
        return [route.split('[[...')[0]];
      }
      
      // For simple dynamic routes without specific data, we'll exclude them
      return [];
    }
    
    return route;
  }).flat().filter(Boolean);
}

/**
 * Convert file paths to URL paths
 */
function convertToUrlPaths(routes) {
  return routes.map(route => {
    // Handle index route
    if (route === '') {
      return '/';
    }
    
    // Ensure leading slash
    return route.startsWith('/') ? route : `/${route}`;
  });
}

/**
 * Main sitemap generation function
 */
export default function sitemap() {
  try {
    // Scan the app directory for page files
    let routes = scanAppDirectory(APP_DIR);
    
    // Process dynamic routes
    routes = processDynamicRoutes(routes);
    
    // Convert to URL paths
    const urlPaths = convertToUrlPaths(routes);
    
    // Create sitemap entries
    return urlPaths.map(path => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      // You could customize changeFrequency and priority based on path patterns
      changeFrequency: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
    }));
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Fallback to basic sitemap
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}