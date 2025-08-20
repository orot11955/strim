/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    return config;
  },
};

export default nextConfig;
