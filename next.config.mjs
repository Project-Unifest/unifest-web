/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["."],
  },
  experimental: { instrumentationHook: true },
};

export default nextConfig;
