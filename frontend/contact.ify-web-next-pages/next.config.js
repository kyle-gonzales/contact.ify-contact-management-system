/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contacts",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
