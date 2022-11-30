module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // 即prettier-> eslint-config-prettier
  extends: ['airbnb', 'eslint:recommended', 'plugin:prettier/recommended', 'plugin:import/errors', 'plugin:import/typescript', 'prettier', 'plugin:storybook/recommended'],
  // 解析器支持新语法
  parserOptions: {
    // 指定ECMAScript的版本 或者年份
    ecmaVersion: 11,
    // 默认为script
    sourceType: 'module',
    // 额外的语言特性
    ecmaFeatures: {
      // 启用JSX
      jsx: true
    }
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  /**
   * "off" or 0 - 关闭规则
   * "warn" or 1 - 开启warning
   * "error" or 2 - 开启error
   */
  rules: {},
  // overrides:可以为某个文件或者某组文件进行覆盖配置
  overrides: [],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};