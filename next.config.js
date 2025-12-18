/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for deployment flexibility
  // output: 'export', // Uncomment this for static export (GitHub Pages, etc.)
  
  // Disable image optimization for static export compatibility
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slashes for static hosting
  trailingSlash: true,
}

module.exports = nextConfig
