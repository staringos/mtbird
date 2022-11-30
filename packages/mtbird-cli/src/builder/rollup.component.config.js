import {getPollupPlugins} from '../utils/rollup';

export default ({ cwd, extensionName }) => {
  const outDir = `${cwd}/dist`
  const outFile = `${outDir}/components.js`
  const plugins = getPollupPlugins(outDir, cwd, [], 'components.css')

  return {
    input: [`src/components/index.ts`],
    output: {
      file: outFile,
      name: `MTBIRD_EXTENSION_COMPONENTS.${extensionName}.components`,
      format: 'umd',
      exports: 'named',
      globals: {
        react: 'react',
        'react-dom': 'react-dom',
        antd: 'antd'
      },
      sourcemap: false
    },
    external: [],
    watch: {
      include: 'src/**'
    },
    plugins
  };
};
