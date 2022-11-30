const rollup = require('rollup');
const getRollupConfig = require('./rollup.config');

const EVENT_MAP = {
  START: '监听器正在启动（重启）',
  BUNDLE_START: '构建单个文件束',
  BUNDLE_END: '完成文件束构建',
  END: '完成所有文件束构建',
  ERROR: '构建时遇到错误',
  FATAL: '遇到无可修复的错误'
}

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