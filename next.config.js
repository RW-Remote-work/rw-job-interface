const withImages = require("next-images");
const { i18n } = require('./next-i18next.config.js')
/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ['tsx'],
  i18n,
  ...withImages({
    reactStrictMode: true,
    images: {
      disableStaticImages: true,
      // domains: ['https://img.cdn.whoops.world/'],
    },
    async rewrites() {
      const isDev = process.env.NODE_ENV === 'development'
      const baseUrl = isDev ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.NEXT_PUBLIC_INNER_API_BASE_URL
      return [
        {
          source: '/api/:path*',
          destination: `${baseUrl}/:path*`
        }
      ]
    }
  }),
  output: 'standalone',
}
