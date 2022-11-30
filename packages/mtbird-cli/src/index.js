
if (typeof global.navigator === 'undefined') global.navigator = {};
import * as Extension from './handler/extension';
import builder from './builder';
import {printLogo} from './utils';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const args = hideBin(process.argv);
const cwd = process.cwd();

const build = builder.bind(null, {
  cwd,
  watch: false
});

const watch = builder.bind(null, {
  cwd,
  watch: true
});

const concurrently = require('concurrently');

yargs(args).command(
  'start',
  '开启拓展服务，Watch拓展变化，并serve 拓展dist文件',
  () => {},
  (argv) => {
    if (!argv.noLogo) printLogo()

    concurrently(
      [
        { command: 'mtbird watch --noLogo', name: 'watch', env: { NODE_ENV: process.env.NODE_ENV || 'development' } },
        { command: 'mtbird serve --noLogo', name: 'serve' },
      ]
    );
  }
)
.help().argv;

yargs(args).command(
    'create [name]',
    '创建MTBird拓展',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      Extension.create(argv.name);
    }
  )
  .help().argv;

yargs(args).command(
    'build',
    '构建MTBird拓展',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      build(argv)
    }
  )
  .help().argv;

yargs(args).command(
    'publish',
    '发布MTBird拓展',
    () => {},
    async (argv) => {
      if (!argv.noLogo) printLogo();
      if (!argv.token) {
        return console.error("权限校验失败，请添加 --token 参数")
      }
      if (!argv.notBuild) await build(argv);
      Extension.publish(argv);
    }
  )
  .help().argv;

yargs(args).command(
    'serve [featureType]',
    '本地启动对构建目录的服务, --port 端口',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      Extension.serve(argv);
    }
  )
  .help().argv;

yargs(args).command(
    'watch',
    '监听插件src源码目录变化，并重新构建',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      watch(argv)
    }
  )
  .help().argv;