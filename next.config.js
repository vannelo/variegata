/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["variegata.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
