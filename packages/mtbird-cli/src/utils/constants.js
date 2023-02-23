export const REGISTRY = {
  TEMPLATE_URL: '',
  REGISTRY_SERVER_URL: process.env.API_URL || 'https://mtbird.staringos.com/api'
}

export const RollupExternal = ['react', 'react/jsx-runtime', 'antd', '@mtbird/core']

export const RollupGlobal = {
  react: 'react',
  antd: 'antd',
  crypto: 'crypto',
  'react-dom': 'react-dom',
  'react/jsx-runtime': 'react/jsxRuntime',
  '@mtbird/core': 'core',
}
