/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com", "img.clerk.com", "res.cloudinary.com"],
  },
  experimental: {
    ppr: "incremental",
  },
};

export default nextConfig;
