/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: "http://localhost:8080/:path*"
      }
    ]
  }
}

module.exports = nextConfig
