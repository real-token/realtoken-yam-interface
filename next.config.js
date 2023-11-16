/** @typedef { import('next').NextConfig } NextConfig */

/** @type { NextConfig } */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async headers() {
    return [
        {
          //
            source: "/manifest.json",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: 'https://app.safe.global',
              },
              {
                key: "Access-Control-Allow-Methods",
                value: 'GET',
              },
              {
                key: "Access-Control-Allow-Headers",
                value: 'X-Requested-With, content-type, Authorization',
              },
            ]
        }
    ]
}
};

module.exports = nextConfig;
