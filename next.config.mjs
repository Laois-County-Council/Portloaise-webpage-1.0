/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  // Required for GitHub Pages subfolder deployment
  basePath: '/Portloaise-webpage-1.0',
  assetPrefix: '/Portloaise-webpage-1.0/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['10.30.84.30', 'localhost:3000'],
}

export default nextConfig