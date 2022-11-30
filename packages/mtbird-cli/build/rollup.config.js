const sourceMaps = require('rollup-plugin-sourcemaps');
const builtins = require('rollup-plugin-node-builtins');
const babel = require('@rollup/plugin-babel').default;
const dotenv = require("rollup-plugin-dotenv").default;
const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

module.exports = (root) => {
  const output = [
    {
      file: 'dist/index.js',
      globals: {
        react: 'react',
        'react-dom': 'react-dom'
      },
      name: `mtbird-cli`,
      format: 'cjs',
      sourcemap: true,
      strict: false,
      exports: 'named',
      banner: '#!/usr/bin/env node'
    }
  ];

  return {
    input: `${root}/src/index.js`,
    output: output,
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['child_process', 'fs', 'path', 'os', 'https', 'readline', 'zlib', 'events', 'stream', 'util', 'buffer'],
    watch: {
      include: 'src/**'
    },
    plugins: [
      dotenv(),
      // https://github.com/calvinmetcalf/rollup-plugin-node-builtins/issues/37
      builtins({ crypto: true }),
      // Allow json resolution
      json(),
      // Compile TypeScript files
      babel({
        // ...pkg.babel,
        ...require('./babel.config')(),
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
        babelrc: true,
        exclude: 'node_modules/**'
      }),
      commonjs(),
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve.default(),
      sourceMaps()
    ]
  };
};
