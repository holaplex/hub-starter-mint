/** @type {import('next').NextConfig} */
const withGraphql = require("next-plugin-graphql");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/keys",
        permanent: false
      },
    ];
  },
};

module.exports = withGraphql(nextConfig);
