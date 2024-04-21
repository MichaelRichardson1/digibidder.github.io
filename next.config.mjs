/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
      domains: ['images.unsplash.com', 'picsum.photos'],
      unoptimized: true,
    },
  };
  
  export default nextConfig;
