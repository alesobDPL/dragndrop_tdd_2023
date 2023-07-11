/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  env: {
    SERVIDOR: process.env.SERVIDOR
  },
  nextConfig
};

