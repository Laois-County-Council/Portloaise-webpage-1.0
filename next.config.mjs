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
}

export default nextConfig