import sourceMaps from 'rollup-plugin-sourcemaps';
import babelGenerate from './babel.config';
import dotenv from "rollup-plugin-dotenv"

const babel = require('@rollup/plugin-babel').default;
const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { uglify } = require('rollup-plugin-uglify');
const { join } = require('path');

const autoExternal = require('rollup-plugin-auto-external');
const builtins = require('rollup-plugin-node-builtins');
const typescript = require('rollup-plugin-typescript2');
const external = require('rollup-plugin-peer-deps-external');

const path = require('path');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

export default ({ cwd, pipeName, extensionName }) => {
  return {
    input: [`src/pipes/${pipeName}.ts`],
    output: {
      file: `${cwd}/dist/pipe-${pipeName}.js`,
      name: `${extensionName}-${pipeName}`,
      format: 'umd'
    },
    external: [],
    watch: {
      include: 'src/**'
    },
    plugins: [
      dotenv(),
      autoExternal({
        dependencies: false,
        packagePath: path.resolve(`${cwd}/package.json`),
        peerDependencies: true
      }),
      json(),
      external({
        packageJsonPath: join(cwd, 'package.json')
      }),
      builtins(),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        // ...pkg.babel,
        ...babelGenerate(),
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
        babelrc: true,
        exclude: 'node_modules/**'
      }),
      commonjs(),
      resolve.default(),
      sourceMaps(),
      uglify()
    ]
  };
};
