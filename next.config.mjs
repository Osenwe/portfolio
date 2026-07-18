/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config settings

  // Hide the Next.js dev tools indicator badge
  devIndicators: false,

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
