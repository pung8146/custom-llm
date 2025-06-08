/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  images: {
    domains: ["api.dicebear.com"], // 프로필 아바타용
  },
};

module.exports = nextConfig;
