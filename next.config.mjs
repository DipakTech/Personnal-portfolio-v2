/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "img.clerk.com",
      "res.cloudinary.com",
      "images.pexels.com",
      "www.docker.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
