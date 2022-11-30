module.exports = function getBabelConfig() {
  return {
    presets: [
      [
        'react-app',
        {
          typescript: true
        }
      ],
      ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-syntax-jsx'
    ],
    exclude: 'node_modules/**'
  };
};
