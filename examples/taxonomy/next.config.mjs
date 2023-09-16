import { withContentlayer } from "next-contentlayer"
import Scrshot from '@scrshot/build/webpack'

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
    config.plugins.push(Scrshot())

    return config;
  }
}

export default withContentlayer(nextConfig)
