import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rxzfoznqybnfmmjgsvtw.supabase.co'], // ✅ your Supabase project domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rxzfoznqybnfmmjgsvtw.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
  experimental: { /* your feature flags */ }
};
  
export default nextConfig;
