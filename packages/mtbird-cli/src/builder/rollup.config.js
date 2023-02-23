
import { GLOBAL_EXTENSION_KEY } from '@mtbird/core';
import { RollupExternal, RollupGlobal } from '../utils/constants';
import { getPollupPlugins } from '../utils/rollup';

const path = require('path');
const copy = require('rollup-plugin-copy');
const fs = require('fs');

export default ({ cwd, format, outputDir, input, outputPrefix, extensionName }) => {
  const cfgList = format.map((f) => {
    const cfg = {
      file: path.join(outputDir, `${outputPrefix || 'index'}.${f}.js`),
      globals: RollupGlobal,
      name: `${GLOBAL_EXTENSION_KEY}.${extensionName}`,
      format: f,
      exports: 'named',
      sourcemap: false
    };

    return cfg;
  });

  let rootDir = path.join(cwd, 'src');
  if (!fs.existsSync(rootDir)) {
    rootDir = './';
  }

  const plugins = getPollupPlugins(outputDir, cwd, [
    copy({
      targets: [
        {
          src: ['src/assets/iconfont/*'],
          dest: 'dist/iconfont'
        },
        {
          src: ['src/assets/images/*'],
          dest: 'dist/images'
        },
        {
          src: ['src/statics/*'],
          dest: 'dist/statics'
        },
        {
          src: ['src/public/*'],
          dest: 'dist'
        },
        {
          src: ['manifest.json'],
          dest: 'dist'
        }
      ]
    })
  ])

  const option = {
    input,
    output: cfgList,
    watch: {
      include: 'src/**'
    },
    external: RollupExternal,
    plugins,
    onwarn(warning) {
      // Skip certain warnings
      // should intercept ... but doesn't in some rollup versions
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }

      // eslint-disable-next-line no-console
      console.log(warning.message);
    }
  };

  return option;
};
