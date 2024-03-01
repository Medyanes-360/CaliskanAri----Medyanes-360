/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/public/01. 4. Sınıf Matematik - 1. Ünite -  4-5-6 Basamaklı Sayılar - Test/story.html",
      destination: "/pages/api/games/1.js",
    },
  ],
  experimental: {
    //appDir: true,
  },
  images: {
    domains: ['source.unsplash.com','images.unsplash.com','free4kwallpapers.com'],
  },
  
}

module.exports = nextConfig