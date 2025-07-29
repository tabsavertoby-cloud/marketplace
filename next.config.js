/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rxzfoznqybnfmmjgsvtw.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rxzfoznqybnfmmjgsvtw.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
