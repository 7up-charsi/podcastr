/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'ai-studio-assets.limewire.media',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },

      // TODO: remove it as its temporary
      {
        protocol: 'https',
        hostname: 'images.wallpapersden.com',
      },
    ],
  },
};

export default nextConfig;
