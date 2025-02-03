/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.S3_BUCKET,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
