module.exports = function getBabelConfig() {
  return {
    presets: [
      [
        'react-app',
        {
          typescript: true
        }
      ]
    ],
    plugins: [],
    exclude: 'node_modules/**'
  };
};
