const rollup = require('rollup');

const EVENT_MAP = {
  START: '监听器正在启动（重启）',
  BUNDLE_START: '构建单个文件束',
  BUNDLE_END: '完成文件束构建',
  END: '完成所有文件束构建',
  ERROR: '构建时遇到错误',
  FATAL: '遇到无可修复的错误'
}
 
export const processWatch = (rollupCfg, include) => {
  const watcher = rollup.watch({
    ...rollupCfg,
    watch: {
      chokidar: true,
      include
    }
  });

  watcher.on('event', (event) => {
    console.log(EVENT_MAP[event.code] || '未知状态');

    if (event.code === 'ERROR') {
      console.log(event.error);
    }
  });
}