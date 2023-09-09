const withScrshot = require('@scrshot/build/next')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withScrshot(nextConfig)
