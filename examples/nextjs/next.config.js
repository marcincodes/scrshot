// import { webpackPlugin } from '@scrshot/bundler';
const webpackPlugin = require('@scrshot/bundler').webpackPlugin
// console.log(webpackPlugin)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // console.log();
    config.plugins.push(webpackPlugin({ strip: false }))
    return config;
  }
}

module.exports = nextConfig
