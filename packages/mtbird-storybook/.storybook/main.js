const path = require('path');
const StorybookQiniuWebpackPlugin = require('storybook-qiniu-webpack-plugin');

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback.crypto = false

    // config.plugins.push(new StorybookQiniuWebpackPlugin({
    //   accessKey: '', // required
    //   secretKey: '', // required
    //   bucket: '', // required
    //   bucketDomain: 'https://cdn.staringos.com/', // required
    //   matchFiles: ['!*.html', '!*.map'],
    //   uploadPath: '/',
    //   usePublicPath: true,
    //   batch: 10,
    //   deltaUpdate: true
    // }))

    // config.output.publicPath = 'https://cdn.staringos.com/'

    config.resolve.alias['react'] = path.resolve(__dirname, "../node_modules/react")

    config.resolve.alias['crypto'] = path.resolve(__dirname, "../node_modules/crypto-browserify")
    config.resolve.alias['@mtbird/shared'] = path.resolve(__dirname, "../node_modules/@mtbird/shared")
    config.resolve.alias['@mtbird/renderer-web'] = path.resolve(__dirname, "../node_modules/@mtbird/renderer-web")
    config.resolve.alias['@mtbird/component-basic'] = path.resolve(__dirname, "../node_modules/@mtbird/component-basic")
    config.resolve.alias['@mtbird/helper-extension'] = path.resolve(__dirname, "../node_modules/@mtbird/helper-extension")
    config.resolve.alias['@mtbird/helper-component'] = path.resolve(__dirname, "../node_modules/@mtbird/helper-component")
    config.resolve.alias['@mtbird/ui'] = path.resolve(__dirname, "../node_modules/@mtbird/ui")
    config.resolve.alias['@mtbird/core'] = path.resolve(__dirname, "../node_modules/@mtbird/core")

    config.resolve.alias['antd'] = path.resolve(__dirname, "../node_modules/antd")

    return config;
  },
  // webpackFinal: async (config, { configType }) => {
  //   if (config.resolve.fallback) {
  //     config.resolve.fallback['cypto'] = false // require.resolve("crypto-browserify")
  //   } else {
  //     config.resolve = {
  //       fallback: {
  //         cypto: require.resolve("crypto-browserify")
  //       }
  //     }
  //   }
  //   console.log("cccccconfig:", config.resolve)
  //   return config
  // },
  "stories": [
    "../src/**/**/*.stories.mdx",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}