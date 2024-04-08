/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";

const nextConfig = {
  output: "standalone",
  swcMinify: true,
  compiler: {
    // eslint-disable-next-line no-undef
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

const withPWA = nextPWA({
  dest: "public",
  register: true,
  // eslint-disable-next-line no-undef
  disable: process.env.NODE_ENV === "development",
});
export default withPWA(nextConfig);
