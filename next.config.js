/** @type {import('next').NextConfig} */

/*
//  Old Default Version
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig
*/

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  env: {
    backendUrl: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    // set imageUrl if IMAGE_DOMAIN is set in env vars to override default
    imageUrl: `https://${process.env.NEXT_IMAGE_DOMAIN}`,
  },
  async rewrites() {
    return [
      {
        // inline-images can still be fetched from their source
        source: "/sites/default/:path*",
        destination: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/sites/default/:path*`,
      },
    ];
  }
}