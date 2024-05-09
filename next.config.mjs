/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["."],
  },
  experimental: { instrumentationHook: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unifest-dev-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
