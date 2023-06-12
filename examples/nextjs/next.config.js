const withScrshot = require('@scrshot/bundler/next')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withScrshot(nextConfig)
