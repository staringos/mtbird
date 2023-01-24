const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals.react = 'react'

    // path
    // config.resolve.alias['react'] = path.resolve(__dirname, './node_modules/react')
    // config.resolve.alias['react-dom'] = path.resolve(__dirname, './node_modules/react-dom')
    config.resolve.alias['antd'] = path.resolve(__dirname, './node_modules/antd')
    config.resolve.alias['@mtbird/shared'] = path.resolve(__dirname, './node_modules/@mtbird/shared')
    config.resolve.alias['@mtbird/renderer-web'] = path.resolve(__dirname, './node_modules/@mtbird/renderer-web')
    config.resolve.alias['@mtbird/component-basic'] = path.resolve(__dirname, './node_modules/@mtbird/component-basic')
    config.resolve.alias['@mtbird/core'] = path.resolve(__dirname, './node_modules/@mtbird/core')
    config.resolve.alias['@mtbird/helper-component'] = path.resolve(__dirname, './node_modules/@mtbird/helper-component')
    config.resolve.alias['@mtbird/helper-extension'] = path.resolve(__dirname, './node_modules/@mtbird/helper-extension')
    config.resolve.alias['@mtbird/ui'] = path.resolve(__dirname, './node_modules/@mtbird/ui')

    return config
  }
}

module.exports = nextConfig
