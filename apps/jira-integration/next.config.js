/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // types will be validated in separate step using tsc which supports project references
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    '@waypoint/components',
    '@waypoint/environment',
    '@waypoint/api-tenant-admin',
    '@waypoint/api-console',
    '@waypoint/typescript-config',
  ],
}

module.exports = nextConfig
