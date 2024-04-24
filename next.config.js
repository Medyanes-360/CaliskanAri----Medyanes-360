/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //appDir: true,
  },
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "free4kwallpapers.com",
      "www.radiustheme.com",
    ],
  },
};

module.exports = nextConfig;
