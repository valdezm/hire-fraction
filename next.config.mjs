/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  devIndicators: false,
  experimental: {
    appDocumentPreloading: true,
  },
  serverExternalPackages: ['jstack'],
}

export default nextConfig
