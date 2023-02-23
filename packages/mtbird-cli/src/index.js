
if (typeof global.navigator === 'undefined') global.navigator = {};
import * as Extension from './handler/extension';
import builder from './builder';
import {printLogo} from './utils';
import pkgJson from '../package.json';

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

yargs(args)
  .command('version', '显示版本信息', () => { 
      console.log(`MtBird CLI Version: v${pkgJson.version} | ENV: ${process.env.NODE_ENV}`);
   })
  .alias('version', 'v')
  .help().argv;

yargs(args).command(
  'start',
  '开启拓展服务，watch 拓展变化，并 serve 拓展 dist 文件',
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
.command(
    'create [name]',
    '创建 MtBird 拓展',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      Extension.create(argv.name);
    }
  )
.command(
    'build',
    '构建 MtBird 拓展',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      build(argv)
    }
  )
.command(
    'publish',
    '发布 MtBird 拓展到官方镜像',
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
.command(
    'serve [featureType]',
    '本地启动对构建目录的服务, --port 端口',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      Extension.serve(argv);
    }
  )
.command(
    'watch',
    '监听插件src源码目录变化，并重新构建',
    () => {},
    (argv) => {
      if (!argv.noLogo) printLogo()
      watch(argv)
    }
  )
  .help().argv;