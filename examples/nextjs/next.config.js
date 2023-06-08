// import { webpackPlugin } from '@scrshot/bundler';
const unplugin = require('@scrshot/bundler').unplugin
// console.log(webpackPlugin)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // console.log();
    config.plugins.push(unplugin.webpack({ strip: true }))
    return config;
  }
}

module.exports = nextConfig
