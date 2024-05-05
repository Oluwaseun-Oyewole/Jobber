/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const nextConfig = {
  output: "standalone",
  swcMinify: true,
  compiler: {
    // eslint-disable-next-line no-undef
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "**" },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

const withPWA = nextPWA({
  dest: "public",
  register: true,
  // eslint-disable-next-line no-undef
  disable: process.env.NODE_ENV === "development",
});
export default withPWA(nextConfig);
