import { withContentlayer } from "next-contentlayer"
import { webpackPlugin } from '@scrshot/bundler'

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  webpack: (config) => {
    config.plugins.push(webpackPlugin())

    return config;
  }
}

export default withContentlayer(nextConfig)
