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
  }
}

