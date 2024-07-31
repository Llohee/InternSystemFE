/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '',
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   ]
  // },
}
export default nextConfig
// module.exports = nextConfig
