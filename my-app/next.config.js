

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd33wubrfki0l68.cloudfront.net',
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'app.netlify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
