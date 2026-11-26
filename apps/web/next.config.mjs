/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace packages that ship TypeScript source (no build step).
  transpilePackages: ['@cvforge/ui', '@cvforge/api-client'],
};

export default nextConfig;
