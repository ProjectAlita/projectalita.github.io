/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For custom domain (elitea.ai), we don't need basePath
  // All assets will be served from the root
}

module.exports = nextConfig