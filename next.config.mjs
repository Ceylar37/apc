/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: '/',
      destination: '/authorized',
      permanent: true
    }
  ]
};

export default nextConfig;
