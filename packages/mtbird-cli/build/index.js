const rollup = require('rollup');
const { EVENT_MAP } = require('../src/utils/build');
const getRollupConfig = require('./rollup.config');

const processWatch = (rollupCfg, include) => {
  const watcher = rollup.watch({
    ...rollupCfg,
    watch: {
      chokidar: true,
      include
    }
  });

  watcher.on('event', (event) => {
    console.log(EVENT_MAP[event.code] || 'Unknow State');

    if (event.code === 'ERROR') {
      console.log(event.error);
    }
  });
}

const build = async (watch = false) => {
  const cwd = process.cwd();
  const rollupEntry = getRollupConfig(cwd);
  const outputs = rollupEntry.output;

  if (watch) processWatch(rollupEntry, `${cwd}/**`)

  const bundle = await rollup.rollup(rollupEntry);
  console.log(`[mtbird] after generate bundle...`);

  await Promise.all(
    outputs.map(async (o) => {
      await bundle.generate(o);
      await bundle.write(o);
    })
  );
};

build(process.argv.indexOf('watch') !== -1);