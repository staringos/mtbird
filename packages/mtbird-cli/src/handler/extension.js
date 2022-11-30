import { execute } from '../utils';
import template from 'lodash/template';
import { startServe } from '../utils/serve';
import fs from 'fs-extra';
import chalk from 'chalk';
import { recallHistory, uploadFileToRegistry } from '../services/extension';

const { join, resolve } = require('path');
const inquirer = require('inquirer');
const cwd = process.cwd();


const createQuestions = (name) => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入拓展唯一标识',
      default() {
        return name;
      }
    },
    {
      type: 'input',
      name: 'title',
      message: '请输入拓展名称',
      default() {
        return name;
      }
    },
    {
      type: 'input',
      name: 'desc',
      message: '请填写插件描述',
      default() {
        return '我是描述信息';
      }
    }
  ]);
}

/**
 * Extension create
 * @param {string} name 
 * @returns 
 */
export const create = async (name) => {
  const answers = await createQuestions(name);
  const dictPath = process.cwd();
  const root = resolve(dictPath, name);
  const isExists = fs.existsSync(root);

  if (isExists) {
    return console.log('[Warning] 同名文件夹已存在!');
  }

  fs.mkdirpSync(name);
  process.chdir(root);

  console.log('[MTBird] 1. 🚗 Clone Template...');

  await execute('git', ['clone', 'https://github.com/staringos/mtbird-extension-template.git', '.']);

  fs.removeSync(`${root}/.git`);

  console.log('[MTBird] 2. 😯 Format Template...');
  const packageTemplate = fs.readFileSync(`${root}/package.json`, {
    encoding: 'utf8'
  });

  const manifestTemplate = fs.readFileSync(`${root}/manifest.json`, {
    encoding: 'utf8'
  });

  const packageJson = template(packageTemplate)(answers);
  const manifestJson = template(manifestTemplate)(answers);

  fs.writeFileSync(`${root}/package.json`, packageJson);
  fs.writeFileSync(`${root}/manifest.json`, manifestJson);


  console.log('[MTBird] 3. 🐆 Yarn install...');
  await execute('yarn');

  console.log('[MTBird] 4. ✌️ MTBird extension create success, please enter fold and run `npm run start`.');
};

export const serve = async (argv) => {
  const root = process.cwd();
  const pkg = require(join(root, './manifest.json'));
  const instance = await startServe(join(process.cwd(), 'dist'), argv.port);

  // eslint-disable-next-line no-console
  console.log(`
   ${chalk.greenBright('拓展本地服务已开启，地址为: ')}
    ${instance.url}?name=${pkg.name}
 `);
}

/**
 * Publish extension
 * 
 * 1. call api to add extension or update extension version
 * 2. upload files to qiniu cdn
 * 3. if error, recall extension history(version), keep extension
 * 4. if success, then success
 * @param {*} argv 
 * @returns 
 */
export const publish = async (argv) => {
  const {token} = argv;
  const manifestPath = join(cwd, 'manifest.json');
  const distPath = join(cwd, 'dist');

  if (!token) return console.log("[Error] 请输入 Token (mtbird publish --token=xxx)！");
  if (!fs.existsSync(manifestPath)) return console.log("[Error] 未找到 Manifest 文件！");
  if (!fs.existsSync(distPath)) return console.log("[Error] 未找到 dist 文件夹！");

  const manifest = require(manifestPath);
  key = manifest.name;

  try {
    // const res = await publishExtension(manifest, token);
    await uploadFileToRegistry(distPath, token, manifest);
    console.log(`[Success] 拓展 ${manifest.name}@${manifest.version} 发布成功!`);
  } catch(e) {
    console.log("[Error] " + (e.response?.data?.msg || e.messasge || e.response?.statusText) || e);
    if (e.response?.status !== 422) {
      await recallHistory(manifest.name, manifest.version, token);
    }
  }
};