/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "192.168.1.*",
    "192.168.*",
    "10.*",
    "172.*",
    "localhost",
    "127.0.0.1",
    "192.168.1.48",
    "192.168.1.48:3000",
  ],
};

export default nextConfig;
