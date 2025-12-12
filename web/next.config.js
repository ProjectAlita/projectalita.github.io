/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For custom domain (elitea.ai), we don't need basePath
  // All assets will be served from the root
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix for mermaid cytoscape import issue
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      }
    }
    return config
  },
}

module.exports = nextConfig