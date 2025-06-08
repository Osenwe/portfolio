/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config settings
  
  // Add redirects for sitemap
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
