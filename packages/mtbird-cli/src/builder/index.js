import getRollupConfig from './rollup.config';
import getRollupPipeConfig from './rollup.pipe.config';
import getRollupComponentConfig from './rollup.component.config'
import { processWatch } from '../utils/build.js';

const { join } = require('path');
const rollup = require('rollup');
const { existsSync } = require('fs');
const assert = require('assert');

const build = async ({ cwd, watch, isMini }) => {  
  const inputs = [join(cwd, 'index.ts'), join(cwd, 'src', 'index.ts'), join(cwd, 'src', 'index.js')];
  const input = inputs.find(existsSync);
  const manifestPath = join(cwd, 'manifest.json');
  const manifest = existsSync(manifestPath) ? require(manifestPath) : {}
  let extensionName = manifest?.name;

  assert.ok(input, `未找到入口文件: ${inputs}`);
  const params = {
    cwd,
    format: ['esm', 'umd'],
    outputDir: join(cwd, 'dist'),
    input,
    isMini,
    extensionName
  }

  const rollupCfg = getRollupConfig(params);
  const outputs = rollupCfg.output;

  if (watch) processWatch(rollupCfg, `${cwd}/**`)
  const bundle = await rollup.rollup(rollupCfg);

  await Promise.all(
    outputs.map(async (o) => {
      await bundle.generate(o);
      await bundle.write(o);

      console.log(`[SUCCESS] 编译结束 ${o.file}`);
    })
  ).catch(e => {
    console.log("Build error:", e)
  })

  if (manifest?.pipes) {
    await Promise.all(
      manifest.pipes.map(async (pipeName) => {
        console.log(`[mtbird] Staring to build pipe (${pipeName})`)

        const rollupPipe = getRollupPipeConfig({
          cwd,
          extensionName,
          pipeName
        })
  
        if (watch) processWatch(rollupPipe, `${cwd}/src/pipes/${pipeName}.ts`)
  
        const bundlePipe = await rollup.rollup(rollupPipe);
        await bundlePipe.write(rollupPipe.output);

        console.log(`[mtbird] Build pipe (${pipeName}) success`)
      })
    )
  }

  if (manifest?.components) {
    console.log(`[mtbird] Staring to build components`)
    const rollupPipe = getRollupComponentConfig({
      cwd,
      extensionName
    })

    if (watch) processWatch(rollupPipe, `${cwd}/src/components/**`)

    const bundlePipe = await rollup.rollup(rollupPipe);
    await bundlePipe.write(rollupPipe.output);

    console.log(`[mtbird] Build components success`)
  }
};

export default build;
